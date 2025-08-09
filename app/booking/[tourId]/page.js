"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { User, CreditCard, Calendar } from "lucide-react";

import { Header } from "@/layout/Header";
import { getTourById, createBooking } from "@/services/tourData"; // Ensure createBooking is imported
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Schema for passenger details form validation
const passengerSchema = z.object({
  fullName: z.string().min(3, "نام و نام خانوادگی الزامی است."),
  nationalId: z.string().length(10, "کد ملی باید ۱۰ رقم باشد."),
  birthDate: z.string().min(1, "تاریخ تولد الزامی است."),
  gender: z.string().min(1, "انتخاب جنسیت الزامی است."),
});

// ====================================================================
// --- Main Booking Page Component ---
// ====================================================================
export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { tourId } = params;

  // Fetch tour data using React Query
  const {
    data: tour,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTourById(tourId),
    enabled: !!tourId,
  });

  // Mutation to handle the booking submission
  const { mutate: bookTour, isPending } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("تور شما با موفقیت رزرو شد!");
      // Invalidate the 'my-tours' query to force a refetch on the profile page
      queryClient.invalidateQueries({ queryKey: ["my-tours"] });
      router.push("/profile?tab=tours"); // Redirect to the "My Tours" tab
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ثبت رزرو.");
    },
  });

  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passengerSchema),
  });

  const onSubmit = (formData) => {
    // Call the mutation with the required data
    bookTour({
      tourId: tour.id,
      passenger: formData,
    });
  };

  if (isLoading)
    return (
      <div className="text-center p-10">در حال بارگذاری اطلاعات تور...</div>
    );
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">
        خطا در دریافت اطلاعات تور.
      </div>
    );

  return (
    <>
      <Header />
      <main className="bg-gray-50/50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* --- Right Column: Passenger Form --- */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
              <h2 className="flex items-center text-2xl font-bold mb-6">
                <User className="ml-2 text-gray-500" />
                مشخصات مسافر
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                    <Input id="fullName" {...register("fullName")} />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nationalId">کد ملی</Label>
                    <Input id="nationalId" {...register("nationalId")} />
                    {errors.nationalId && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.nationalId.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="birthDate">تاریخ تولد</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      {...register("birthDate")}
                    />
                    {errors.birthDate && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.birthDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">جنسیت</Label>
                    <select
                      id="gender"
                      {...register("gender")}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="male">مرد</option>
                      <option value="female">زن</option>
                    </select>
                    {errors.gender && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* --- Left Column: Tour Summary & Checkout --- */}
            <aside className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
                <h3 className="text-xl font-bold">{tour?.title}</h3>
                <div className="mt-4 space-y-3 text-gray-600 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="ml-2 h-5 w-5 text-gray-400" />
                      <span>تاریخ رفت:</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {tour?.startDate
                        ? new Date(tour.startDate).toLocaleDateString("fa-IR")
                        : "..."}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="ml-2 h-5 w-5 text-gray-400" />
                      <span>تاریخ برگشت:</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {tour?.endDate
                        ? new Date(tour.endDate).toLocaleDateString("fa-IR")
                        : "..."}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="ml-2 h-5 w-5 text-gray-400" />
                    <span>قیمت نهایی:</span>
                    <span className="font-bold text-lg text-black mr-auto">
                      {new Intl.NumberFormat().format(tour?.price || 0)} تومان
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  size="lg"
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-lg"
                  disabled={isPending}
                >
                  {isPending ? "در حال ثبت..." : "ثبت و خرید نهایی"}
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
