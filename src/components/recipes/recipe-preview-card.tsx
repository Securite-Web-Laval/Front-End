'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { dishGetOne, dishLike } from "@/lib/services/dish"
import { Like } from "@/types/recipe"
import { Badge, Clock, Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface RecipeCardProps {
  recipeName: string
  cookingTime: string
  labels?: string[]
  recipeId: string
  like?: Like
  onLikeUpdate?: () => void
}

export default function RecipePreviewCard({ recipeName, cookingTime, labels = [], recipeId, onLikeUpdate }: RecipeCardProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!session?.user?._id) return

      try {
        const recipeDetails = await dishGetOne(`dishes/${recipeId}`)
        console.log("Recipe details:", recipeDetails);

        if (recipeDetails && recipeDetails.like) {
          setLikesCount(recipeDetails.like.total || 0)

          console.log("Like users array:", JSON.stringify(recipeDetails.like.users));
          console.log("Current user ID:", session.user._id);

          const userHasLiked = Array.isArray(recipeDetails.like.users) &&
            recipeDetails.like.users.some(userId =>
              userId === session.user._id ||
              (typeof userId === 'object' && userId._id === session.user._id)
            );

          console.log(`User ${session.user._id} has liked: ${userHasLiked}`);
          setIsLiked(userHasLiked);
        }
      } catch (error) {
        console.error("Error checking like status:", error)
      }
    }

    if (session?.user?._id) {
      checkIfLiked()
    }
  }, [recipeId, session?.user?._id, session?.access_token])

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!session?.user?._id) {
      router.push('/login')
      return
    }

    try {
      console.log(`Liking dish ${recipeId} with token ${session.access_token?.substring(0, 10)}...`);
      const response = await dishLike(`dishes/like/${recipeId}`, session.access_token || '');
      console.log('Like response:', response);

      if (response) {
        console.log("Like response structure:", JSON.stringify(response));

        if (response.like && response.like.users) {
          const newIsLiked = Array.isArray(response.like.users) &&
            /* eslint-disable */
            response.like.users.some((userId: any) =>
              userId === session?.user?._id ||
              (typeof userId === 'object' && userId._id === session?.user?._id)
            );

          console.log(`After like action, user liked status: ${newIsLiked}`);
          setIsLiked(newIsLiked);
          setLikesCount(response.like.total || 0);
        } else {
          const newIsLiked = !isLiked;
          setIsLiked(newIsLiked);
          setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
          console.log(`Fallback: toggling like status to ${newIsLiked}`);
        }
      }

      if (onLikeUpdate) {
        onLikeUpdate();
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  }

  return (
    <Card className="w-72 overflow-hidden" onClick={() => router.push(`/recipes/${recipeId}`)}>
      <div className=" p-4 flex-col items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className=" text-black hover:text-red-500 transition-colors"
          onClick={handleLike}
        >
          <Heart className={`h-8 w-8 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          {likesCount > 0 && <span className=" text-black text-xs rounded-full px-1">{likesCount}</span>}
        </Button>
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold">{recipeName}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{cookingTime}</span>
        </div>
      </CardContent>
      <CardFooter>
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <Badge key={label}>
                {label}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card >
  )
}


