type BookingRoutePlaceholderProps = {
  title: string;
};

export function BookingRoutePlaceholder({
  title,
}: BookingRoutePlaceholderProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-[120px]">
      <section className="mx-auto w-full max-w-[1200px] rounded-xl border border-border bg-white p-8">
        <h1 className="font-serif text-[32px] font-medium leading-[46px] text-foreground">
          {title}
        </h1>
      </section>
    </main>
  );
}
