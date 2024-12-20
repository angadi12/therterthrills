import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Component() {
  return (
    <section className="flex justify-center items-center w-full md:py-20 py-10 mb-8">
    <Card className="md:w-3/4 w-11/12 mx-auto md:p-4 p-1">
      <CardHeader>
        <CardTitle className="md;text-2xl text-xl font-bold text-center">
          Privacy Policy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-xs md:text-lg">
        <p className="text-sm text-gray-600">
          {`At The Theatre Thrills, accessible from www.thetheatrethrills.com, safeguarding visitor privacy is a top priority. This Privacy Policy outlines the types of information we collect, how it's recorded, and how we use it.`}
        </p>
        <p className="text-sm text-gray-600">
         {` For any questions about our Privacy Policy, please reach us at +91
           939 8617 123(WhatsApp only). This policy covers only information
          gathered through our website, not data collected offline or via other
          channels.`}
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-2">Consent</h2>
          <p className="text-sm text-gray-600">
           {` By using our website, you consent to our Privacy Policy and agree to
            its terms.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Information We Collect</h2>
          <p className="text-sm text-gray-600">
           {` We specify any requested personal information at the point of
            collection. When you reach out to us directly, we may receive
            information such as your name, email, phone number, and message
            details. Registration details include name, company, address, email,
            and phone number.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            How We Use Your Information
          </h2>
          <p className="text-sm text-gray-600">
            Collected information is used to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 ml-4 space-y-1">
            <li>{`Operate and maintain our website,`}</li>
            <li>{`Personalize and enhance website functionality,`}</li>
            <li>{`Understand website usage,`}</li>
            <li>{`Develop new products and services,`}</li>
            <li>
            {`  Communicate directly or via partners for customer service,
              updates, and promotional purposes,`}
            </li>
            <li>Prevent fraud.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Log Files</h2>
          <p className="text-sm text-gray-600">
           {` The Theatre Thrills uses standard log files to track visitors'
            activity, analyze trends, and gather demographic data without
            linking it to personally identifiable information.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Advertising Partners</h2>
          <p className="text-sm text-gray-600">
           {` Our site may use cookies and beacons from advertisers like Google
            and Meta. These technologies measure advertising effectiveness and
            personalize content. We advise reviewing the Privacy Policies of
            these partners to manage cookie preferences.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Third-Party Privacy</h2>
          <p className="text-sm text-gray-600">
           {` Our Privacy Policy does not cover other advertisers or websites.
            Check third-party Privacy Policies for more on data handling and
            opting out.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">CCPA & GDPR Rights</h2>
          <p className="text-sm text-gray-600">
           {` Under CCPA, California residents have rights to data access,
            deletion, and the option to prevent data sales. Under GDPR, users
            have rights to access, correct, delete, restrict, or object to data
            processing, and request data transfers. For these requests, please
            contact us.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{`Children's Information`}</h2>
          <p className="text-sm text-gray-600">
          {`  Protecting children's privacy online is essential. We do not
            knowingly collect data from children under 13. If you believe your
            child has shared information, contact us to remove it.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Policy Changes</h2>
          <p className="text-sm text-gray-600">
          {`  We may periodically update this Privacy Policy and recommend
            reviewing it regularly. Changes are effective upon posting.`}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className="text-sm text-gray-600">
          {`  For questions or feedback, please reach us on WhatsApp at +91
            939 8617 123.`}
          </p>
        </section>
      </CardContent>
    </Card>
    </section>
  );
}
