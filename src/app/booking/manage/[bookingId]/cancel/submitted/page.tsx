import { CancellationSubmittedView } from "@/components/booking/cancellation-submitted-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type CancellationSubmittedPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
};

export default async function CancellationSubmittedPage({
  params,
}: CancellationSubmittedPageProps) {
  const { bookingId } = await params;

  return (
    <>
      <Navbar />
      <main>
        <CancellationSubmittedView bookingId={bookingId} />
      </main>
      <Footer />
    </>
  );
}
