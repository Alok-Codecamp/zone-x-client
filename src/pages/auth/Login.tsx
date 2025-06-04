
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { jwtDecode } from 'jwt-decode'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axiosClient from "@/utils/axiosClient";
import { useState } from "react";
import type { JwtPayload } from "@/types/jwtPayload";


const formSchema = z.object({
    userName: z
        .string()
        .min(1, { message: "Username is required" })
        .max(20, { message: "Username must be at most 20 characters long" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    rememberMe: z.boolean().optional(), // boolean type here
});

const Login = () => {
    const [errorRes, setErrorRes] = useState<string>('')
    const [successRes, setSuccessRes] = useState<string>('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            password: "",
            rememberMe: false

        },
    })
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
        console.log(data)
        try {
            const res = await axiosClient.post('auth/signIn', data);
            // console.log(res.data);
            setSuccessRes(res.data.message)
            setErrorRes('')
            const decoded = jwtDecode(res?.data?.data) as JwtPayload

            const userInfo = {
                userName: decoded.userName,
                shopName: decoded.shopName
            }
            const signInInfo = {
                userInfo,
                token: res?.data?.data
            }
            localStorage.setItem('signinInfo', JSON.stringify(signInInfo))
        } catch (error: any) {
            console.log(error.response.data);
            setErrorRes(error.response.data.message)
            setSuccessRes('')
        }
        // console.log(successRes, errorRes);
    }



    return (
        <div>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {
                        successRes && <p>{successRes}</p>
                    }
                    {
                        errorRes && <p>{errorRes}</p>
                    }
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="User Name" {...field} />
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
                                    <Input placeholder="Password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2">

                                <FormControl>
                                    <Checkbox id="rememberMe"
                                        checked={!!field.value} // converts to strict boolean
                                        onCheckedChange={(checked) => field.onChange(!!checked)}
                                        ref={field.ref} />
                                </FormControl>
                                <FormLabel>Remember me</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full bg-transparent border-1 border-white hover:bg-violet-600" type="submit">
                        {
                            form.formState.isSubmitting ? 'signing In...' : 'Sign In'
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Login;
