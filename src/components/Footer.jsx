import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#f7f7f7] border-t mt-16">
            <div className="max-w[1440px] mx-auto px-6 py-12 space-y-12">

                {/* Inspiration Section */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Inspiration for future getaways
                    </h3>

                    {/* CATEGORY TABS */}
                    <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-600 border-b pb-4">
                        <span className="text-black border-b-2 border-black pb-2">
                            Popular
                        </span>
                        <span className="hover:text-black cursor-pointer">Arts & culture</span>
                        <span className="hover:text-black cursor-pointer">Beach</span>
                        <span className="hover:text-black cursor-pointer">Mountains</span>
                        <span className="hover:text-black cursor-pointer">Outdoors</span>
                        <span className="hover:text-black cursor-pointer">Things to do</span>
                    </div>

                    {/* DESTINATIONS GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-6 gap-x-4 mt-6 text-sm">
                        {[
                            ["Athens", "Apartment rentals"],
                            ["Madrid", "Monthly Rentals"],
                            ["Wilmington", "Flat rentals"],
                            ["Key West", "Cottage rentals"],
                            ["Tokyo", "Villa rentals"],
                            ["Savannah", "Cottage rentals"],
                            ["Manhattan", "Apartment rentals"],
                            ["Kansas City", "Monthly Rentals"],
                            ["San Juan", "Flat rentals"],
                            ["Brooklyn", "Holiday rentals"],
                            ["Dallas", "Villa rentals"],
                            ["Kyoto", "Apartment rentals"],
                            ["Charleston", "Holiday rentals"],
                            ["Dubai", "House rentals"],
                            ["Galveston", "Monthly Rentals"],
                            ["San Antonio", "Apartment rentals"],
                            ["Cleveland", "Apartment rentals"],
                        ].map(([city, type], i) => (
                            <div key={i}>
                                <p className="font-medium text-gray-800">{city}</p>
                                <p className="text-gray-500">{type}</p>
                            </div>
                        ))}
                    </div>

                    <button className="text-sm font-medium text-black mt-6 hover:underline">
                        Show more
                    </button>
                </section>

                {/* FOOTER LINKS */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    <FooterColumn
                        title="Support"
                        links={[
                            "Help Centre",
                            "Get help with a safety issue",
                            "AirCover",
                            "Anti-discrimination",
                            "Disability support",
                            "Cancellation options",
                            "Report neighbourhood concern",
                        ]}
                    />

                    <FooterColumn
                        title="Hosting"
                        links={[
                            "PrimeStay Inn your home",
                            "PrimeStay Inn your experience",
                            "PrimeStay Inn your service",
                            "PrimeStay Inn for Hosts",
                            "Hosting resources",
                            "Community forum",
                            "Hosting responsibly",
                            "Join a free Hosting class",
                            "Find a co-host",
                            "Refer a host",
                        ]}
                    />

                    <FooterColumn
                        title="PrimeStay Inn"
                        links={[
                            "2025 Summer Release",
                            "Newsroom",
                            "Careers",
                            "Investors",
                            "PrimeStay Inn.org emergency stays",
                        ]}
                    />

                    <FooterColumn
                        title="Footer section"
                        links={[]}
                    />
                </section>

                {/* BOTTOM BAR */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 border-t pt-6 gap-4">
                    <p>© 2025 PrimeStay Inn, Inc.</p>
                    <div className="flex gap-4">
                        <span className="hover:underline cursor-pointer">Privacy</span>
                        <span className="hover:underline cursor-pointer">Terms</span>
                        <span className="hover:underline cursor-pointer">Company details</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

/* ---------- FOOTER COLUMN ---------- */

const FooterColumn = ({ title, links }) => (
    <div>
        <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
        <ul className="space-y-2">
            {links.map((link, i) => (
                <li
                    key={i}
                    className="text-gray-600 hover:underline cursor-pointer"
                >
                    {link}
                </li>
            ))}
        </ul>
    </div>
);
