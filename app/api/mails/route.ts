import { transporter } from "@/lib/cron";
import prismadb from "@/lib/prismadb";
import { clerkClient } from "@clerk/nextjs";
import { isBefore, subDays } from "date-fns";
import { NextResponse } from "next/server";
import { mergeConfigs } from "tailwind-merge";

export async function GET() {
  // Lấy thông tin người dùng từ Clerk
  const users = await clerkClient.users.getUserList();

  for (const user of users) {
    // Kiểm tra nếu có ít nhất một địa chỉ email cho người dùng
    if (user.emailAddresses.length > 0) {
      // Lấy thông tin địa chỉ email đầu tiên của người dùng
      const emailAddress = user.emailAddresses[0].emailAddress;

      // Kiểm tra thời hạn trả sách
      const borrow = await prismadb.borrow.findFirst({
        where: {
          userId: user.id,
          isReturn: false,
        },
        orderBy: {
          dateReturn: "asc",
        },
      });

      if (borrow) {
        const returnDate = borrow.dateReturn;

        // Thay returnDate bằng trường ngày trả sách trong thông tin của người dùng
        const oneDayBeforeReturn = subDays(returnDate, 1);
        const currentDate = new Date();

        if (isBefore(oneDayBeforeReturn, currentDate)) {
          // Nếu còn 1 ngày trước ngày trả sách, gửi email
          const mailOptions = {
            from: "huuduc963@gmail.com", // Địa chỉ email nguồn gửi
            to: emailAddress, // Gán địa chỉ email từ emailAddress vào trường to
            subject: "Hạn Trả sách",
            text: "Còn 1 ngày nữa tới hạn trả sách, vui lòng đến thư viện trả sách!",
          };
          
          try {
            // Gửi email
            const info = await transporter.sendMail(mailOptions);
            console.log(
              `Email sent to user. ${emailAddress}: ${info.response}`
            );

            return new NextResponse("Send email sucessfully! :))", {status: 200})
          } catch (error) {
            console.error(error);
            return new NextResponse("Send email Failed! :((", {status: 500})
          }
        }
      }
    }
  }
}
