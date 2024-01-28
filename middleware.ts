export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // "/admindash",
    // "/all",
    "/leaves",
    // "/new",
    // "/payslips",
    "/generalapplyleave",
    "/generalprofile",
    "/managerapplyforleave",
    "/managerdash",
    "/managerapproveleave",
    "/managerseeworkers",
  ],
};
