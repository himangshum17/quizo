import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useEffect } from "react";
const formSchema = z.object({
  email: z.string().email(),
});
const ForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form, form.formState.isSubmitSuccessful]);

  return (
    <section className="min-h-dvh md:grid md:grid-cols-12 md:overflow-hidden">
      <div className="col-span-7">
        <img
          src="https://images.unsplash.com/photo-1540835296355-c04f7a063cbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-span-5 bg-white px-10 py-20">
        <div className="mx-auto mt-12 flex h-full max-w-xl flex-col justify-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-700 lg:text-4xl">
            Forgot Password?
          </h2>
          <p className="mt-4 text-base">
            No worries, we will reset instruction
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-12 space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: John@example.com"
                        {...field}
                        className="h-14 rounded-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="h-16 w-full rounded-full uppercase tracking-wide"
              >
                reset password
              </Button>
              <Link
                to={ROUTES.LOGIN}
                className="!mt-12 flex justify-center gap-2 text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
                Back to Login
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
