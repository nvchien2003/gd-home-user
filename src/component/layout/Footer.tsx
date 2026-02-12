import { Home, MapPin, MessageSquare } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Support",
    links: ["Help Center", "Terms of Service", "Legal", "Privacy Policy"],
  },
];

const CONTACTS = [
  {
    icon: MapPin,
    content: (
      <>
        123 Innovation Dr,<br />San Francisco, CA 94103
      </>
    ),
  },
  {
    icon: MessageSquare,
    content: "support@renthome.com",
  },
];

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">GDHome</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The most trusted marketplace for house rentals. Find your dream home or list your property today.
            </p>

            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gray-100 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Sections */}
          {FOOTER_LINKS.map(section => (
            <FooterSection key={section.title} title={section.title}>
              <ul className="space-y-3 text-sm text-gray-500">
                {section.links.map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-indigo-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterSection>
          ))}

          {/* Contact */}
          <FooterSection title="Contact">
            <ul className="space-y-3 text-sm text-gray-500">
              {CONTACTS.map(({ icon: Icon, content }, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-indigo-600 shrink-0" />
                  <span>{content}</span>
                </li>
              ))}
            </ul>
          </FooterSection>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 GDHome Inc. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            {["Privacy", "Terms", "Sitemap"].map(item => (
              <a key={item} href="#" className="hover:text-gray-900">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
