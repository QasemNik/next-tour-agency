import { getUserProfile, updateUserProfile } from "@/services/userData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoCard, InfoRow } from "@/helper/profileInfo";
import { Button } from "../ui/button";

export function ProfileInfo() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["profile"],
        queryFn: getUserProfile,
    });

    const { register, handleSubmit } = useForm({
        values: {
            // Pre-fill form with fetched data
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            nationalId: data?.nationalId || "",
            birthDate: data?.birthDate || "",
            gender: data?.gender || "",
            // Add other fields as needed
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (updatedData) => {
            console.log("Updated=>",updatedData);
            
            toast.success("پروفایل با موفقیت به روز شد.");
            queryClient.invalidateQueries({ queryKey: ["profile"] }); // Refetch data
            setIsEditing(false); // Exit edit mode
        },
        onError: (error) => {
            toast.error(error.message || "خطا در به روز رسانی پروفایل.");
        },
    });

    if (isLoading) return <div className="text-center p-10">Loading...</div>;
    if (isError)
        return (
            <div className="text-center p-10 text-red-500">
                Error loading profile.
            </div>
        );

    const onSubmit = (formData) => {
        mutate(formData);
    };

    return (
        <div className="space-y-6">
            {/* View Mode */}
            {!isEditing && (
                <>
                    <InfoCard
                        title="اطلاعات حساب کاربری"
                        onEdit={() => setIsEditing(true)}
                    >
                        <InfoRow label="شماره موبایل" value={data.mobile} isMono />
                        <InfoRow label="ایمیل" value={data.email} />
                    </InfoCard>
                    <InfoCard title="اطلاعات شخصی" onEdit={() => setIsEditing(true)}>
                        <InfoRow
                            label="نام و نام خانوادگی"
                            value={`${data.firstName || ""} ${data.lastName || ""}`}
                        />
                        <InfoRow label="کد ملی" value={data.nationalId} />
                        <InfoRow label="جنسیت" value={data.gender} />
                        <InfoRow label="تاریخ تولد" value={data.birthDate} />
                    </InfoCard>
                    <InfoCard
                        title="اطلاعات حساب بانکی"
                        onEdit={() => setIsEditing(true)}
                    >
                        <InfoRow label="شماره کارت" value={data.cardNumber} isMono />
                    </InfoCard>
                </>
            )}

            {/* Edit Mode */}
            {isEditing && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-6 rounded-lg shadow-sm space-y-4"
                >
                    <h3 className="font-bold text-lg">ویرایش اطلاعات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">نام</Label>
                            <Input id="firstName" {...register("firstName")} />
                        </div>
                        <div>
                            <Label htmlFor="lastName">نام خانوادگی</Label>
                            <Input id="lastName" {...register("lastName")} />
                        </div>
                        <div>
                            <Label htmlFor="nationalId">کد ملی</Label>
                            <Input id="nationalId" {...register("nationalId")} />
                        </div>
                        <div>
                            <Label htmlFor="birthDate">تاریخ تولد</Label>
                            <Input id="birthDate" {...register("birthDate")} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                        >
                            انصراف
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "در حال ذخیره..." : "تایید"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}