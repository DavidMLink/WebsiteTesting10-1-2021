// let array = [];

// let phrase = 'Hello';
// let phrase2 = 'World';

// array.push(phrase);
// array.push(phrase2);
// array.map(async (el) => {
//     await console.log(el)
//     await whatever()
//     await console.log(el)
// })

// function whatever() {
//     console.log("Wazzup!");
// }



let failedPages = [
    {
        "Title": "About",
        "URLs": "https://www.ivwatch.com/about/"
    },
    {
        "Title": "About",
        "URLs": "https://www2.ivwatch.com/about/"
    },
    {
        "Title": "All Posts",
        "URLs": "https://www.ivwatch.com/myiv/all-posts/"
    },
    {
        "Title": "All-News",
        "URLs": "https://www.ivwatch.com/media/all-news/"
    },
    {
        "Title": "Blox",
        "URLs": "https://www.ivwatch.com/blox/"
    },
    {
        "Title": "Brand Marketing and Communications Manager",
        "URLs": "https://www.ivwatch.com/careers/brand-marketing-and-communications-manager/"
    },
    {
        "Title": "Careers",
        "URLs": "https://www.ivwatch.com/careers/"
    },
    {
        "Title": "CNC Machine Operator",
        "URLs": "https://www.ivwatch.com/careers/cnc-machine-operator/"
    },
    {
        "Title": "Contact us",
        "URLs": "https://www.ivwatch.com/contact-us/"
    },
    {
        "Title": "Converting Machine Operator",
        "URLs": "https://www.ivwatch.com/careers/converting-machine-operator/"
    },
    {
        "Title": "Cookie Policy",
        "URLs": "https://www.ivwatch.com/cookie-policy/"
    },
    {
        "Title": "Cost Accountant",
        "URLs": "https://www.ivwatch.com/careers/cost-accountant/"
    },
    {
        "Title": "Customer Survey",
        "URLs": "https://www.ivwatch.com/customer-survey/"
    },
    {
        "Title": "Education",
        "URLs": "https://www.ivwatch.com/education/"
    },
    {
        "Title": "Engineering Product Manager",
        "URLs": "https://www.ivwatch.com/careers/engineering-product-manager/"
    },
    {
        "Title": "Evaluation Survey",
        "URLs": "https://www.ivwatch.com/evaluation-survey/"
    },
    {
        "Title": "Evidence",
        "URLs": "https://www.ivwatch.com/evidence/"
    },
    {
        "Title": "Glossary",
        "URLs": "https://www.ivwatch.com/glossary/"
    },
    {
        "Title": "Glossary",
        "URLs": "https://www.ivwatch.com/myiv/glossary/"
    },
    {
        "Title": "Home",
        "URLs": "https://www.ivwatch.com/"
    },
    {
        "Title": "How to Buy",
        "URLs": "https://www.ivwatch.com/how-to-buy/"
    },
    {
        "Title": "Inventory Clerk",
        "URLs": "https://www.ivwatch.com/careers/inventory-clerk/"
    },
    {
        "Title": "Key Account Executive – Eastern US",
        "URLs": "https://www.ivwatch.com/careers/key-account-executive-east/"
    },
    {
        "Title": "Media",
        "URLs": "https://www.ivwatch.com/media/"
    },
    {
        "Title": "MyIV",
        "URLs": "https://www.ivwatch.com/myiv/"
    },
    {
        "Title": "OEM Solutions",
        "URLs": "https://www.ivwatch.com/oem-solutions/"
    },
    {
        "Title": "Packaging Specialist",
        "URLs": "https://www.ivwatch.com/careers/packaging-specialist/"
    },
    {
        "Title": "Patents",
        "URLs": "https://www.ivwatch.com/patents/"
    },
    {
        "Title": "Patient Monitors",
        "URLs": "https://www.ivwatch.com/patient-monitors/"
    },
    {
        "Title": "Privacy Policy",
        "URLs": "https://www.ivwatch.com/privacy-policy/"
    },
    {
        "Title": "Products",
        "URLs": "https://www.ivwatch.com/products/"
    },
    {
        "Title": "Regulatory",
        "URLs": "https://www.ivwatch.com/regulatory/"
    },
    {
        "Title": "Request a Demo",
        "URLs": "https://www.ivwatch.com/request-a-demo/"
    },
    {
        "Title": "Sensors and Accessories",
        "URLs": "https://www.ivwatch.com/sensors-and-accessories/"
    },
    {
        "Title": "SmartTouch",
        "URLs": "https://www.ivwatch.com/smarttouch/"
    },
    {
        "Title": "Social Media Policy",
        "URLs": "https://www.ivwatch.com/social-media-policy/"
    },
    {
        "Title": "Specialties",
        "URLs": "https://www.ivwatch.com/specialties/"
    },
    {
        "Title": "Support",
        "URLs": "https://www.ivwatch.com/support/"
    },
    {
        "Title": "Terms and Conditions of Sale",
        "URLs": "https://www.ivwatch.com/terms-and-conditions-of-sale/"
    },
    {
        "Title": "Truck Driver",
        "URLs": "https://www.ivwatch.com/careers/truck-driver/"
    },
    {
        "Title": "Warehouse Clerk",
        "URLs": "https://www.ivwatch.com/careers/warehouse-clerk/"
    },
    {
        "Title": "Warehouse Supervisor",
        "URLs": "https://www.ivwatch.com/careers/warehouse-supervisor/"
    },
    {
        "Title": "Webinar Registration",
        "URLs": "https://www.ivwatch.com/webinar/"
    }
];


failedPages[0]["badURLS"] = ['blah.com', 'google.com', 'wazzup.com', 'what.com', 'okay.com']

console.log(failedPages[0])

// Correct Output

// Hello
// Wazzup!
// Hello
// World
// Wazzup!
// World