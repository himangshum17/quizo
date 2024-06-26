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
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginData, loginUser } from "@/services/auth/login.service";
import { useAppDispatch } from "@/store/hooks";
import { userLogin } from "@/store/reducer/auth";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUserSuccess = (data: loginData) => {
    dispatch(userLogin(data));
    navigate(ROUTES.SELECTCATEGORY);
  };

  const {
    mutate: loginUserMutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      loginUserSuccess(data);
    },
    onError: (data) => {
      console.log("error data", data);
      if (isAxiosError(data)) {
        toast({
          variant: "destructive",
          title: data.response?.data.message || data?.message,
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Something went wrong...",
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUserMutate(values);
  }
  useEffect(() => {
    if (form.formState.isSubmitSuccessful && isSuccess) {
      form.reset();
    }
  }, [form, form.formState.isSubmitSuccessful, isSuccess]);

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
        <h1 className="mx-auto max-w-xl text-4xl font-bold tracking-tight text-gray-600 lg:text-5xl">
          Quizo
        </h1>
        <div className="mx-auto mt-12 flex h-full max-w-xl flex-col justify-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-700 lg:text-4xl">
            Hello, Welcome!
          </h2>
          <p className="mt-4 text-base">
            <Link to={ROUTES.REGISTER} className="underline">
              {" "}
              <strong>Create a free account</strong>
            </Link>
            , or login to get started with <strong>Quizo</strong>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        className="h-14 rounded-full"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                to={ROUTES.FORGOTPASSWORD}
                className="mt-2 flex justify-end text-sm"
              >
                Forgot Password?
              </Link>
              <Button
                type="submit"
                className="h-16 w-full rounded-full uppercase tracking-wide"
                disabled={isPending}
              >
                {isPending && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                log in
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default Login;
