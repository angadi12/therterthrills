"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { blogs } from "@/components/Blogscomponents/Blogsdata";
import { useParams } from "next/navigation";

export default function TheatreBlogPost() {
  const params = useParams();
  const router = useRouter();

  // Find the blog by id
  const blog = blogs.find((b) => b.id === parseInt(params.id, 10));

  // If no matching blog is found
  if (!blog) {
    return (
      <div className="w-11/12 mx-auto px-4 py-16 text-center">
        <h1 className="md:text-3xl text-lg font-bold mb-4">Blog Not Found</h1>
        <span
          onClick={() => router.back()}
          className="text-[#F30278] hover:[#F30278]/70 cursor-pointer"
        >
          Go Back
        </span>
      </div>
    );
  }

  return (
    <article className="w-11/12 mx-auto px-4 py-16">
      <span
        onClick={() => router.back()}
        className="text-[#F30278] hover:[#F30278]/70 mb-4 inline-block cursor-pointer"
      >
        Go Back
      </span>

      <h1 className="text-xl md:text-4xl font-bold mb-6">{blog.title}</h1>

      <div className="relative h-[200px] md:h-[400px] w-full mb-6 overflow-hidden rounded-lg shadow-lg">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <p className="text-gray-700 leading-relaxed mb-8">{blog.description}</p>

      {blog.sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="md:text-2xl text-lg font-bold mb-4">{section.subtitle}</h2>
          <p className="text-gray-700  leading-relaxed">{section.details}</p>
        </section>
      ))}

      {/* <div className="mt-12 bg-[#F30278]/10 rounded-lg p-6 shadow-inner">
        <h2 className="text-2xl font-bold mb-4 text-[#F30278]">
          Book Your Private Theatre Experience Today!
        </h2>
        <p className="text-gray-700 leading-relaxed font-semibold">
          Make your next celebration a blockbuster hit at a private theatre—an
          experience that's bound to be cherished for years to come!
        </p>
      </div> */}
    </article>
  );
}
