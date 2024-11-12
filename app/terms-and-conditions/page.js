import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const terms = [
    {
      title: "Booking Eligibility",
      content: "Guests must be at least 18 years old to book a private theatre room. Minors are not eligible for bookings."
    },
    {
      title: "No Smoking or Drinking",
      content: "For the comfort and safety of all our guests, smoking and drinking are strictly prohibited inside the theater. We appreciate your cooperation in helping us maintain a clean, family-friendly environment."
    },
    {
      title: "OTT Account Requirement",
      content: "Guests must bring their own OTT (over-the-top) account credentials to view specific movies on streaming platforms. We do not provide streaming accounts for private screenings."
    },
    {
      title: "Payment and Refunds",
      content: "Advance payment is required to confirm bookings. Please review our Refund Policy for details on cancellations."
    },
    {
      title: "Facility Use",
      content: "Guests agree to follow all provided guidelines and take responsibility for personal conduct within the theatre room to ensure a positive experience for all."
    },
    {
      title: "Liability",
      content: "The Theatre Thrills is not responsible for lost items or personal accidents on the premises."
    }
  ]

  return (
    <section className="flex justify-center items-center w-full py-20 mb-8">
    <Card className="w-3/4 mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Terms & Condition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {terms.map((term, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-2">{`${index + 1}. ${term.title}`}</h2>
            <p className="text-sm text-gray-600">{term.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
</section>
  )
}