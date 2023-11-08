"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"



const PromptCard = ({ post, handLeTagClick, handLeEdit, handLeDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();



  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  let image = post.creator.image
  let username = post.creator.username
  let email = post.creator.email

  const clickHandler = () => {

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">

        <div
          onClick={clickHandler}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {email}
            </p>
          </div>

        </div>

        <div className="copy_btn " onClick={handleCopy}>
          <Image src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={12}
            height={12}
            alt="copy_image"

          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700" >
        {post.prompt}
      </p>


      <p className="font-inter text-sm blue_radient cursor-pointer "
        onClick={() => {
          handLeTagClick && handLeTagClick(post.tag)
        }}
      >{post.tag}</p>
      {
        session?.user.id === post.creator._id && pathname === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handLeEdit} >Edit</p>
            <p className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handLeDelete} >Delete</p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard