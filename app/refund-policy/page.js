import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Component() {
  return (
    <section className="flex justify-center items-center w-full py-20 mb-8">
    <Card className="w-3/4 mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Refund Policy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4 list-disc pl-6">
          <li>{`We require a ₹700 advance to confirm your booking.`}</li>
          <li>
           {` If you cancel at least 72 hours before your scheduled time, ₹500 of
            the advance will be refunded.`}
          </li>
          <li>
           {` Cancellations made within 72 hours, as well as no-shows or late
            arrivals, are not eligible for refunds.`}
          </li>
          <li>
           {` To request a cancellation, contact us via`} <strong> WhatsApp at +91 8363802949 </strong>
            {`Refunds are processed within 7 business days of the request.`}
          </li>
          <li>
           For any questions or clarifications about our refund policy, feel
            free to reach out. We&apos;re here to assist!
          </li>
        </ul>
      </CardContent>
    </Card>

    </section>
  );
}
