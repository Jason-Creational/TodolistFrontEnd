# 🎨 README Frontend (Next.js + Tailwind CSS)

## 🚀 Giới thiệu

Frontend được xây dựng bằng **Next.js**, cung cấp giao diện cho ứng dụng
quản lý công việc: - Tạo nhiệm vụ bằng ngôn ngữ tự nhiên tiếng Việt -
Xem nhiệm vụ theo Inbox / Today / Upcoming / Completed - Quản lý
Projects - Xác thực người dùng bằng JWT - Popup nhắc nhở

------------------------------------------------------------------------

## 📦 Cài đặt

### 1️⃣ Clone repo

``` bash
git clone <repo-frontend-url>
cd frontend
```

### 2️⃣ Cài dependencies

``` bash
npm install
```

### 3️⃣ Tạo file `.env`

    NEXT_PUBLIC_API_URL=http://localhost:8000

------------------------------------------------------------------------

## ▶️ Chạy ứng dụng

``` bash
npm run dev
```

Truy cập:

    http://localhost:3000

------------------------------------------------------------------------

## 🧩 Các thành phần chính

### ✔ TaskInput

-   Nhập câu tiếng Việt
-   Gọi API `/api/nlp`
-   Hiển thị kết quả phân tích

### ✔ TaskList

-   Danh sách nhiệm vụ theo trang hiện tại

### ✔ Sidebar

-   Inbox\
-   Today\
-   Upcoming\
-   Completed\
-   Projects

### ✔ Quản lý Projects

-   Tạo / xem / sắp xếp nhiệm vụ theo dự án

### ✔ Xác thực

-   Lưu token JWT vào `localStorage`
-   Gửi token trong header API

------------------------------------------------------------------------

## 📂 Cấu trúc thư mục

    frontend/
     ├── components/
     │    ├── Header.js
     │    ├── Sidebar.js
     │    ├── TaskInput.js
     │    ├── TaskList.js
     │    └── ProjectModal.js
     ├── pages/
     │    ├── index.js        (Inbox)
     │    ├── today.js
     │    ├── upcoming.js
     │    ├── completed.js
     │    ├── projects/
     │    │      ├── index.js
     │    │      └── [id].js
     │    ├── login.js
     │    └── signup.js
     ├── styles/
     └── package.json

------------------------------------------------------------------------

## 🧠 Công nghệ sử dụng

-   Next.js (React)
-   Tailwind CSS
-   Axios
-   JWT Authentication
-   React Hooks
