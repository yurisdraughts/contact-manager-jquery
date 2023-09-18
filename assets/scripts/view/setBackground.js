export default function () {
  $(".background").on("mousemove", function (event) {
    const mousePosition = Math.hypot(
      event.clientX / this.offsetWidth,
      event.clientY / this.offsetHeight
    );

    const basePercent = 25,
      percentRange = 50,
      adjustablePercent = percentRange * mousePosition;

    const gradientPercent = basePercent + adjustablePercent;

    this.style.setProperty("--middle-point", `${gradientPercent}%`);
  });
}
