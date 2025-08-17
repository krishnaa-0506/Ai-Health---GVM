import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="bg-gradient-spice bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>By accessing and using Cooksy AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Use License</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>Permission is granted to temporarily use Cooksy AI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the platform</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:</p>
            <ul>
              <li>Safeguarding the password and all activities under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Ensuring your account information remains accurate and up-to-date</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>You may not use our service:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Content and Recipes</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>Our service provides recipes and cooking information for educational and informational purposes. We make no warranties about:</p>
            <ul>
              <li>The accuracy, reliability, or completeness of recipe information</li>
              <li>The suitability of recipes for specific dietary needs or restrictions</li>
              <li>Food safety or allergen information</li>
            </ul>
            <p>Users are responsible for verifying recipe information and ensuring food safety practices.</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI-Generated Content</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>Our AI-powered features provide suggestions and recommendations based on algorithms and user preferences. Please note:</p>
            <ul>
              <li>AI suggestions are for informational purposes only</li>
              <li>We do not guarantee the accuracy or suitability of AI-generated content</li>
              <li>Users should use their own judgment when following AI recommendations</li>
              <li>Always verify ingredient compatibility with dietary restrictions and allergies</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>The information on this platform is provided on an 'as is' basis. To the fullest extent permitted by law, this Company:</p>
            <ul>
              <li>Excludes all representations and warranties relating to this platform and its contents</li>
              <li>Excludes all liability for damages arising out of or in connection with your use of this platform</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>In no event shall Cooksy AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cooksy AI's platform, even if Cooksy AI or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <div className="mt-4">
              <p><strong>Email:</strong> legal@cooksy.ai</p>
              <p><strong>Address:</strong> Tech Hub, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;