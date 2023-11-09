import nodemailer from "nodemailer";
import cron from "node-cron";
import prismadb from "./prismadb";
import { subDays, isBefore } from "date-fns";
import { clerkClient } from "@clerk/nextjs";

// Tạo một đối tượng transporter với thông tin cấu hình SMTP
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "huuduc963@gmail.com",
    pass: process.env.MAIL_SERVER_PASSWORD!,
  },
});

export async function sendEmailEveryday() {
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

            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        }
      }
    }
  }
}

// cron.schedule("05 20 * * *", async () => {
//   // Lấy thông tin người dùng từ Clerk
//   const users = await clerkClient.users.getUserList();

//   for (const user of users) {
//     // Kiểm tra nếu có ít nhất một địa chỉ email cho người dùng
//     if (user.emailAddresses.length > 0) {
//       // Lấy thông tin địa chỉ email đầu tiên của người dùng
//       const emailAddress = user.emailAddresses[0].emailAddress;

//       // Kiểm tra thời hạn trả sách
//       const borrow = await prismadb.borrow.findFirst({
//         where: {
//           userId: user.id,
//           isReturn: false
//         },
//         orderBy: {
//           dateReturn: "desc",
//         },
//       });

//       if (borrow) {
//         const returnDate = borrow.dateReturn;

//         // Thay returnDate bằng trường ngày trả sách trong thông tin của người dùng
//         const oneDayBeforeReturn = subDays(returnDate, 1);
//         const currentDate = new Date();

//         if (isBefore(currentDate, oneDayBeforeReturn)) {
//           // Nếu còn 1 ngày trước ngày trả sách, gửi email
//           const mailOptions = {
//             from: "huuduc963@gmail.com", // Địa chỉ email nguồn gửi
//             to: emailAddress, // Gán địa chỉ email từ emailAddress vào trường to
//             subject: "Hạn Trả sách",
//             text: "Còn 1 ngày nữa tới hạn trả sách, vui lòng đến thư viện trả sách!",
//           };

//           try {
//             // Gửi email
//             const info = await transporter.sendMail(mailOptions);
//             console.log(`Email sent to user. ${emailAddress}: ${info.response}`);
//           } catch (error) {
//             console.error(error);
//           }
//         }
//       }
//     }
//   }
// });
