'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { dishGetOne, dishLike } from "@/lib/services/dish"
import { Badge, Clock, Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface RecipeCardProps {
  imageSrc: string
  recipeName: string
  cookingTime: string
  labels?: string[]
  recipeId: string
  onLikeUpdate?: () => void
}

export default function RecipeCard({ imageSrc, recipeName, cookingTime, labels = [], recipeId, onLikeUpdate }: RecipeCardProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!session?.user?._id) return

      try {
        const recipeDetails = await dishGetOne(`dishes/${recipeId}`)
        if (recipeDetails.like) {
          setLikesCount(recipeDetails.like.total || 0)
          setIsLiked(recipeDetails.like.users.includes(session.user._id))
        }
      } catch (error) {
        console.error("Error checking like status:", error)
      }
    }

    checkIfLiked()
  }, [recipeId, session?.user?._id])

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking like button

    if (!session?.user?._id) {
      router.push('/login')
      return
    }

    try {
      console.log(`Liking dish ${recipeId} with token ${session.access_token?.substring(0, 10)}...`);
      const response = await dishLike(`dishes/like/${recipeId}`, session.access_token || '');
      console.log('Like response:', response);

      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      if (onLikeUpdate) {
        onLikeUpdate();
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  }

  return (
    <Card className="w-72 overflow-hidden" onClick={() => router.push(`/recipes/${recipeId}`)}>
      <div className="relative h-48">
        <Image src={imageSrc || "/placeholder.svg"} alt={recipeName} className="w-full h-full object-cover" fill />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 text-white hover:text-red-500 transition-colors"
          onClick={handleLike}
        >
          <Heart className={`h-8 w-8 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          {likesCount > 0 && <span className="absolute -bottom-1 -right-1 bg-white text-black text-xs rounded-full px-1">{likesCount}</span>}
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
    </Card>
  )
}


