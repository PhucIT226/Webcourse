export async function up(queryInterface) {
  await queryInterface.addConstraint("enrollments", {
    fields: ["userId", "courseId"],
    type: "unique",
    name: "unique_user_course_enrollment", // đặt tên constraint cho dễ quản lý
  });
}

export async function down(queryInterface) {
  await queryInterface.removeConstraint("enrollments", "unique_user_course_enrollment");
}
