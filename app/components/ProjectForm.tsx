"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken, updateUserProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleStateChange = (filedName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [filedName]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = await fetchToken();

    try {
      if (type === "create") {
        // create Project
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }

      if (type === "edit") {
        // edit Project
        await updateUserProject(form, project?.id as string, token);
        router.push(`/`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload an Image File");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  return (
    <form onSubmit={handleOnSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="image" className="flexCenter form_image-label">
          {!form.image && "choose a poster for your project"}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="form_image-input"
          required={type === "create"}
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="project-poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Project Title"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        isTextArea
        title="Description"
        state={form.description}
        placeholder="showcase & discover remarkable developer project"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website Url"
        state={form.liveSiteUrl}
        placeholder="https://www.vercel.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="GitHub Url"
        state={form.githubUrl}
        placeholder="https://www.github.com"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      {/* Cutom Input for the Category */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating..." : "Editing..."}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
