
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod"

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
import axiosClient from "@/utils/axiosClient";
import { useState } from "react";

import { Link } from "react-router";


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
    shopNames: z
        .array(
            z.object({
                name: z.string().min(1, { message: "Shop name cannot be empty" }),
            })
        )
        .min(3, { message: "You must provide at least 3 shop names" }),
});
type LoginFormType = z.infer<typeof formSchema>;
const SignUp = () => {
    // const navigate = useNavigate();
    const [errorRes, setErrorRes] = useState<string>('')
    const [successRes, setSuccessRes] = useState<string>('')
    const form = useForm<LoginFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            password: "",
            shopNames: [{ name: '' }, { name: '' }, { name: '' }],

        },
    })
    const { fields, append, remove } = useFieldArray<LoginFormType>({
        control: form.control,
        name: "shopNames", // ✅ Now TypeScript knows this is a valid key
    });
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
        const newData = {
            userName: data.userName,
            password: data.password,
            shopNames: data.shopNames.map(item => item.name)
        }
        try {
            const res = await axiosClient.post('user/signup', newData);
            console.log(res.data);
            setSuccessRes(`${res.data.message}. Please sign in by clicking the sign in button`)

            setErrorRes('')
            // navigate('/')
            form.reset();

        } catch (error: any) {
            console.log(error.response);
            setErrorRes(error.response.data.message)
            setSuccessRes('')
        }
        // console.log(successRes, errorRes);
    }



    return (

        <div className=' auth-container-phone md:auth-container'>

            <div className="md:w-1/2 bg-violet-900 md:ml-auto text-center text-white px-10 py-20">
                <h1 className="text-2xl">Sign UP</h1>
                <p>Already have an account?<Link to='/'>Sign In</Link></p>
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
                            {fields.map((field: any, index: number) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`shopNames.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shop Name {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter shop name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <Button type="button" onClick={() => append({ name: '' })}>
                                Add Another Shop
                            </Button>

                            {fields.length > 3 && (
                                <Button
                                    className="mx-4"
                                    type="button"
                                    onClick={() => remove(fields.length - 1)}
                                    variant="destructive"
                                >
                                    Remove last shop
                                </Button>
                            )}
                            <Button className="w-full bg-transparent border-1 border-white hover:bg-violet-600" type="submit">
                                {
                                    form.formState.isSubmitting ? 'signing In...' : 'Sign In'
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
