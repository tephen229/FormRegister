import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../atoms/Input";
import { PasswordInput } from "../atoms/PasswordInput";
import { Select } from "../atoms/Select";
import { Textarea } from "../atoms/Textarea";
import { Button } from "../atoms/Button";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter"),
  event: z.string().min(1, "Pilih event"),
  bio: z.string().optional(),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await new Promise((res) => setTimeout(res, 2000));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <Input
        label="Nama"
        name="name"
        register={register}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        name="email"
        register={register}
        error={errors.email?.message}
      />

      <PasswordInput
        label="Password"
        name="password"
        register={register}
        error={errors.password?.message}
      />

      <Select
        label="Event"
        name="event"
        register={register}
        error={errors.event?.message}
        options={[
          { label: "Invofest", value: "invofest" },
          { label: "Workshop AI", value: "ai" },
        ]}
      />

      <Textarea
        label="Bio"
        name="bio"
        register={register}
        error={errors.bio?.message}
      />

      <Button type="submit" label="Daftar" isLoading={isSubmitting} />

    </form>
  );
}