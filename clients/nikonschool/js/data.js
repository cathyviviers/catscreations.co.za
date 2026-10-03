/*
  Nikon School SA concept: content data.
  In production this comes from the CMS, so the Nikon team edits it through
  the dashboard instead of touching code. Dates, seats and venues are sample data.
*/
(function (root) {
  var people = [
    {
      slug: "nikon-school-team",
      name: "Nikon School SA Team",
      role: "team",
      specialty: "Camera training and fundamentals",
      city: "Johannesburg and online",
      art: "lightcraft",
      bio: "The in-house Nikon School trainers run the free introductory classes. If you have just unboxed a Nikon, this is the team that gets you from auto mode to confident in one session.",
      highlights: ["Runs every free workshop", "Hands-on with Z-series, Coolpix and Speedlights", "Questions answered by Nikon product specialists"],
      socials: { instagram: "#", youtube: "#" }
    },
    {
      slug: "brett-florens",
      name: "Brett Florens",
      role: "ambassador",
      specialty: "Weddings, portraits and off-camera flash",
      city: "South Africa and international",
      art: "flash",
      gear: "Nikon Z9",
      bio: "Brett Florens has been a professional wedding photographer for more than 25 years and a Nikon ambassador since 2008. He has written six photography books published by Amherst Media, was chosen as Nikon's representative wedding photographer worldwide at Photokina, and teaches photographers around the world.",
      highlights: ["Wedding storytelling", "Off-camera flash", "Posing and directing couples", "Building a photography business"],
      socials: { website: "https://brettflorens.com/" }
    },
    {
      slug: "craig-kolesky",
      name: "Craig Kolesky",
      role: "ambassador",
      specialty: "Adventure, action and lifestyle",
      city: "Cape Town",
      art: "surf",
      bio: "Craig Kolesky is a Cape Town adventure sports photographer and one of the original Nikon South Africa Premium Ambassadors. With no formal training, he built a career shooting sport and lifestyle for international brands like Red Bull and Oakley, chasing surf, trail running and mountain biking from Madagascar and Morocco to Hawaii and the Maldives.",
      highlights: ["Surf and water photography", "Freezing fast action", "Shooting for brands"],
      socials: { website: "https://craigkolesky.com/" }
    },
    {
      slug: "seagram-pearce",
      name: "Seagram Pearce",
      role: "ambassador",
      specialty: "Commercial and automotive",
      city: "Cape Town",
      art: "auto",
      bio: "Seagram Pearce is a Cape Town commercial photographer and automotive director, and a Nikon South Africa ambassador. His cinematic, precisely lit work has carried international campaigns for brands including BMW, Volkswagen, Toyota, Lexus, Porsche and Ferrari.",
      highlights: ["Automotive lighting", "Cinematic storytelling", "Running a commercial production"],
      socials: { website: "https://www.seagrampearce.com/" }
    },
    {
      slug: "wim-van-den-heever",
      name: "Wim van den Heever",
      role: "ambassador",
      specialty: "Wildlife and fine art nature",
      city: "South Africa and worldwide",
      art: "wildlife",
      bio: "Wim van den Heever is a South African wildlife photographer and Nikon ambassador, crowned Wildlife Photographer of the Year 2025 for Ghost Town Visitor: a brown hyena in the abandoned diamond town of Kolmanskop, Namibia, captured with a camera trap after a decade of trying. He runs Tusk Photo, leading photographic trips from the Arctic and Antarctic to the Masai Mara, Brazil's jaguars and Japan's snow monkeys.",
      highlights: ["Wildlife Photographer of the Year 2025", "Camera trap photography", "Leading photo safaris worldwide"],
      socials: { website: "https://www.wimvandenheever.com/" }
    },
    {
      slug: "zandile-ndhlovu",
      name: "Zandile Ndhlovu",
      role: "ambassador",
      specialty: "Ocean, freediving and underwater storytelling",
      city: "Cape Town",
      art: "ocean",
      bio: "Zandile Ndhlovu, known as the Black Mermaid, is South Africa's first Black female freediving instructor and the founder of the Black Mermaid Foundation, which opens up the ocean to people who have been kept out of it. She was named on the BBC's 100 Women list in 2023 and shares the underwater world through her own eyes.",
      highlights: ["Freediving and ocean access", "Underwater storytelling", "BBC 100 Women 2023"],
      socials: {}
    },
    {
      slug: "saudiq-davids",
      name: "Saudiq Davids",
      role: "host",
      specialty: "Sunsets and cityscapes",
      city: "Cape Town",
      art: "cityscape",
      bio: "Saudiq hosts the Nikon Sunset and CityScapes workshop: a golden-hour walk where you learn to read the light, balance bright skies with dark streets and come home with a skyline worth printing.",
      highlights: ["Golden hour and blue hour", "Long exposure and light trails", "Composing a city skyline"],
      socials: { instagram: "#", tiktok: "#" }
    },
    {
      slug: "bongani-baloyi",
      name: "Bongani Baloyi",
      role: "host",
      specialty: "Lens, movement and visual storytelling",
      city: "Johannesburg",
      art: "masterclass",
      bio: "Bongani hosts Nikon Masterclass II, a session on choosing the right lens, moving with intent and building a story shot by shot, for stills and for video.",
      highlights: ["Lens choice for story", "Camera movement", "Sequencing a visual story"],
      socials: { instagram: "#", youtube: "#" }
    },
    {
      slug: "kavo-r",
      name: "Kavo R",
      role: "host",
      specialty: "Composition and the art of seeing",
      city: "Johannesburg",
      art: "seeing",
      bio: "Kavo hosts The Art of Seeing, a workshop about slowing down, noticing light, shape and gesture, and training your eye before you train your settings.",
      highlights: ["Seeing light and shape", "Intentional composition", "Building a personal style"],
      socials: { instagram: "#" }
    },
    {
      slug: "ayesha-patel",
      sample: true,
      name: "Ayesha Patel",
      role: "creator",
      specialty: "Fashion and editorial portraits",
      city: "Durban",
      art: "portrait",
      gear: "Nikon Zf, NIKKOR Z 85mm f/1.2 S",
      bio: "Sample creator profile. Creators are the people Nikon partners with for content and campaigns. Each one gets a page to point their audience to.",
      highlights: ["Natural light portraits", "Styling a shoot", "Skin tones in camera"],
      socials: { instagram: "#", tiktok: "#" }
    },
    {
      slug: "thabo-nkosi",
      sample: true,
      name: "Thabo Nkosi",
      role: "creator",
      specialty: "Sport and action",
      city: "Pretoria",
      art: "sport",
      gear: "Nikon Z9, NIKKOR Z 70-200mm f/2.8 VR S",
      bio: "Sample creator profile. Fast glass, fast subjects. A creator page can carry a promo code or a campaign link, and the dashboard shows how many bookings each link brought in.",
      highlights: ["Subject tracking AF", "Panning", "Shooting from the sideline"],
      socials: { instagram: "#", youtube: "#" }
    }
  ];

  var workshops = [
    {
      slug: "lightcraft-fundamentals",
      title: "LightCraft: The Art & Fundamentals of Photography",
      short: "LightCraft",
      price: 0,
      level: "Beginner",
      format: "In person",
      duration: "3 hours",
      groupSize: 20,
      host: "nikon-school-team",
      art: "lightcraft",
      featured: true,
      summary: "Our free starter class. Get off auto, understand exposure and leave knowing exactly what every dial on your Nikon does.",
      learn: [
        "The exposure triangle: aperture, shutter speed and ISO, explained with your own camera",
        "How to read light and use it, indoors and out",
        "Focus modes and when to switch between them",
        "Composition basics that instantly lift your photos",
        "Which paid workshop to take next for the kind of photos you want"
      ],
      bring: ["Your Nikon camera (any model) with a charged battery", "An empty memory card", "Your camera manual or the Nikon app on your phone"],
      schedule: [
        ["09:00", "Welcome and camera check"],
        ["09:20", "Exposure, hands-on"],
        ["10:30", "Coffee break"],
        ["10:45", "Light and composition walk"],
        ["11:40", "Review your shots with a trainer"]
      ],
      sessions: [
        { id: "lc-1", date: "2026-10-17", time: "09:00", city: "Johannesburg", venue: "Nikon School studio, Johannesburg", seats: 20, taken: 14 },
        { id: "lc-2", date: "2026-10-24", time: "09:00", city: "Cape Town", venue: "Nikon School pop-up, Cape Town", seats: 20, taken: 9 },
        { id: "lc-3", date: "2026-11-07", time: "18:00", city: "Online", venue: "Live online class", seats: 60, taken: 22 },
        { id: "lc-4", date: "2026-11-14", time: "09:00", city: "Johannesburg", venue: "Nikon School studio, Johannesburg", seats: 20, taken: 3 }
      ]
    },
    {
      slug: "nikon-z-video",
      title: "Introduction to Nikon Z-Video",
      short: "Z-Video",
      price: 0,
      level: "Beginner",
      format: "In person",
      duration: "2 hours",
      groupSize: 16,
      host: "nikon-school-team",
      art: "zvideo",
      summary: "Switch your Z camera to video mode with confidence: frame rates, picture profiles, audio and steady handheld shots.",
      learn: ["Frame rates and shutter speed for smooth video", "Picture profiles and N-Log in plain language", "Getting clean audio", "Handheld technique without a gimbal"],
      bring: ["Your Nikon Z camera", "A fast memory card", "Headphones if you have them"],
      schedule: [["10:00", "Video settings that matter"], ["10:45", "Shoot a short scene"], ["11:30", "Playback and feedback"]],
      sessions: [
        { id: "zv-1", date: "2026-10-31", time: "10:00", city: "Johannesburg", venue: "Nikon School studio, Johannesburg", seats: 16, taken: 11 },
        { id: "zv-2", date: "2026-11-21", time: "18:00", city: "Online", venue: "Live online class", seats: 60, taken: 18 }
      ]
    },
    {
      slug: "know-your-z-series",
      title: "Get to Know Your Nikon Z-Series Camera",
      short: "Know your Z",
      price: 0,
      level: "Beginner",
      format: "In person",
      duration: "2 hours",
      groupSize: 16,
      host: "nikon-school-team",
      art: "zseries",
      summary: "A guided tour of your new Z camera: menus, custom buttons, autofocus and the settings worth changing on day one.",
      learn: ["Setting up the i-menu and custom buttons", "Subject detection autofocus", "Shooting modes made simple", "Pairing with SnapBridge"],
      bring: ["Your Nikon Z camera, charged", "Your phone with SnapBridge installed"],
      schedule: [["10:00", "Unboxing to set-up"], ["10:40", "Autofocus deep dive"], ["11:20", "Your questions"]],
      sessions: [
        { id: "kz-1", date: "2026-10-18", time: "10:00", city: "Cape Town", venue: "Nikon School pop-up, Cape Town", seats: 16, taken: 6 },
        { id: "kz-2", date: "2026-11-28", time: "10:00", city: "Johannesburg", venue: "Nikon School studio, Johannesburg", seats: 16, taken: 2 }
      ]
    },
    {
      slug: "coolpix-training",
      title: "Nikon Coolpix Camera Training",
      short: "Coolpix",
      price: 0,
      level: "Beginner",
      format: "Online",
      duration: "90 minutes",
      groupSize: 60,
      host: "nikon-school-team",
      art: "coolpix",
      summary: "Get the most from your Coolpix: zoom, scene modes, and sharp shots of birds, sport and the moon.",
      learn: ["Using the long zoom without blur", "Scene modes that actually help", "Moon and bird shooting tips", "Getting photos onto your phone"],
      bring: ["Your Coolpix camera", "A tripod if you have one"],
      schedule: [["18:00", "Zoom and stability"], ["18:40", "Scene modes"], ["19:10", "Q&A"]],
      sessions: [
        { id: "cp-1", date: "2026-10-22", time: "18:00", city: "Online", venue: "Live online class", seats: 60, taken: 31 }
      ]
    },
    {
      slug: "sunset-cityscapes-saudiq-davids",
      title: "Sunset & CityScapes Workshop with Saudiq Davids",
      short: "Sunset & CityScapes",
      price: 300,
      level: "Intermediate",
      format: "In person",
      duration: "4 hours",
      groupSize: 12,
      host: "saudiq-davids",
      art: "cityscape",
      summary: "A golden-hour photo walk through the city. Learn to balance bright skies and dark streets, then stay on for blue hour and light trails.",
      learn: ["Planning for golden and blue hour", "Exposure bracketing for high-contrast scenes", "Long exposures and light trails on a tripod", "Composing skylines and leading lines", "Quick edits to finish your hero shot"],
      bring: ["Your Nikon camera and a wide or standard lens", "A tripod (we have a few to lend)", "Warm layer for after sunset"],
      schedule: [["16:00", "Meet, plan the light"], ["16:30", "Golden hour walk"], ["18:15", "Blue hour and light trails"], ["19:30", "Review and wrap"]],
      sessions: [
        { id: "sc-1", date: "2026-10-25", time: "16:00", city: "Cape Town", venue: "Meeting point shared on booking, Cape Town CBD", seats: 12, taken: 10 },
        { id: "sc-2", date: "2026-11-22", time: "16:30", city: "Cape Town", venue: "Meeting point shared on booking, Cape Town CBD", seats: 12, taken: 4 }
      ]
    },
    {
      slug: "masterclass-ii-bongani-baloyi",
      title: "Masterclass II: Lens, Movement & Visual Storytelling with Bongani Baloyi",
      short: "Masterclass II",
      price: 200,
      level: "Intermediate",
      format: "In person",
      duration: "3 hours",
      groupSize: 14,
      host: "bongani-baloyi",
      art: "masterclass",
      summary: "Go beyond pretty frames. Learn how lens choice and camera movement shape a story, for stills and for video.",
      learn: ["How focal length changes the feeling of a scene", "Moving the camera with purpose", "Shot lists and sequencing", "Shooting a short story on the day"],
      bring: ["Your Nikon camera", "Any lenses you own", "Comfortable shoes"],
      schedule: [["13:00", "Lens and emotion"], ["14:00", "Movement drills"], ["15:00", "Shoot a sequence"], ["15:45", "Group review"]],
      sessions: [
        { id: "mc-1", date: "2026-11-01", time: "13:00", city: "Johannesburg", venue: "Nikon School studio, Johannesburg", seats: 14, taken: 8 },
        { id: "mc-2", date: "2026-12-06", time: "13:00", city: "Johannesburg", venue: "Nikon School studio, Johannesburg", seats: 14, taken: 1 }
      ]
    },
    {
      slug: "art-of-seeing-kavo-r",
      title: "The Art of Seeing with Kavo R",
      short: "The Art of Seeing",
      price: 500,
      level: "All levels",
      format: "In person",
      duration: "5 hours",
      groupSize: 12,
      host: "kavo-r",
      art: "seeing",
      summary: "A slower, deeper workshop about training your eye: light, shape, gesture and the patience to wait for the moment.",
      learn: ["Seeing light before you shoot it", "Shape, line and negative space", "Gesture and the decisive moment", "Editing a small, strong set of images", "Finding your own style"],
      bring: ["Your Nikon camera with one lens", "A notebook", "An open mind"],
      schedule: [["09:00", "Looking exercises"], ["10:30", "Street session"], ["12:30", "Lunch (included)"], ["13:15", "Edit and critique"]],
      sessions: [
        { id: "as-1", date: "2026-11-08", time: "09:00", city: "Johannesburg", venue: "Maboneng, Johannesburg", seats: 12, taken: 7 },
        { id: "as-2", date: "2026-12-13", time: "09:00", city: "Johannesburg", venue: "Maboneng, Johannesburg", seats: 12, taken: 0 }
      ]
    },
    {
      slug: "off-camera-flash-brett-florens",
      sample: true,
      title: "Off-Camera Flash with Brett Florens",
      short: "Off-Camera Flash",
      price: 1500,
      level: "Intermediate",
      format: "In person",
      duration: "Full day",
      groupSize: 12,
      host: "brett-florens",
      art: "flash",
      summary: "Sample listing. A full day with Nikon ambassador Brett Florens on taking flash off the camera: shaping light, mixing it with daylight and lighting couples on location.",
      learn: ["Why off-camera flash beats on-camera flash", "One-light and two-light setups", "Balancing flash with ambient light", "Lighting and posing couples on location", "Workflow for weddings and events"],
      bring: ["Your Nikon camera and a standard zoom", "A Nikon Speedlight if you have one (we have loan units)", "Fresh batteries"],
      schedule: [["09:00", "Light theory, fast"], ["10:30", "One-light setups"], ["12:30", "Lunch (included)"], ["13:30", "On-location couple shoot"], ["16:00", "Review and Q&A"]],
      sessions: [
        { id: "of-1", date: "2026-11-15", time: "09:00", city: "Johannesburg", venue: "Nikon School studio, Johannesburg", seats: 12, taken: 9 },
        { id: "of-2", date: "2027-01-24", time: "09:00", city: "Cape Town", venue: "Venue shared on booking, Cape Town", seats: 12, taken: 2 }
      ]
    },
    {
      slug: "action-adventure-craig-kolesky",
      sample: true,
      title: "Action & Adventure with Craig Kolesky",
      short: "Action & Adventure",
      price: 950,
      level: "Intermediate",
      format: "In person",
      duration: "4 hours",
      groupSize: 10,
      host: "craig-kolesky",
      art: "surf",
      summary: "Sample listing. A morning on the Cape Town coast with Nikon ambassador Craig Kolesky, learning to freeze surfers, riders and runners mid-moment.",
      learn: ["Autofocus settings for fast, unpredictable subjects", "Shutter speeds to freeze or show motion", "Shooting from the water's edge safely", "Telling a lifestyle story around the action"],
      bring: ["Your Nikon camera and a telephoto zoom", "Spare batteries and cards", "Sun protection"],
      schedule: [["06:30", "Sunrise briefing"], ["07:00", "Surf session"], ["09:00", "Coffee and quick edits"], ["09:45", "Trail and bike action"]],
      sessions: [
        { id: "ak-1", date: "2026-11-29", time: "06:30", city: "Cape Town", venue: "Meeting point shared on booking, Muizenberg", seats: 10, taken: 7 }
      ]
    },
    {
      slug: "automotive-lighting-seagram-pearce",
      sample: true,
      title: "Automotive Lighting with Seagram Pearce",
      short: "Automotive Lighting",
      price: 1200,
      level: "Advanced",
      format: "In person",
      duration: "5 hours",
      groupSize: 10,
      host: "seagram-pearce",
      art: "auto",
      summary: "Sample listing. Light a car like a campaign. Nikon ambassador Seagram Pearce shows how commercial automotive images are planned, lit and finished.",
      learn: ["Reading a car's lines and reflections", "Light painting and long exposures", "Composite lighting for campaign work", "Planning a commercial shoot"],
      bring: ["Your Nikon camera and a tripod", "A remote release or the SnapBridge app", "Dark clothing"],
      schedule: [["16:00", "Planning the shot"], ["17:00", "Golden hour exteriors"], ["19:00", "Light painting after dark"], ["20:30", "Compositing demo"]],
      sessions: [
        { id: "al-1", date: "2026-12-05", time: "16:00", city: "Cape Town", venue: "Studio shared on booking, Cape Town", seats: 10, taken: 4 }
      ]
    },    {
      slug: "ocean-storytelling-zandile-ndhlovu",
      sample: true,
      title: "Ocean Storytelling with Zandile Ndhlovu",
      short: "Ocean Storytelling",
      price: 850,
      level: "All levels",
      format: "In person",
      duration: "4 hours",
      groupSize: 10,
      host: "zandile-ndhlovu",
      art: "ocean",
      summary: "Sample listing. A morning by the sea with Nikon ambassador Zandile Ndhlovu: how to tell the story of the ocean and the people who love it, from the shore and in the shallows.",
      learn: ["Photographing water, light and texture", "Telling people's stories around the ocean", "Keeping your gear safe near salt water", "An introduction to underwater housings"],
      bring: ["Your Nikon camera", "A towel and sun protection", "A swimsuit if you'd like to try the shallows"],
      schedule: [["08:00", "Welcome and ocean safety"], ["08:30", "Shoreline session"], ["10:00", "In the shallows"], ["11:30", "Story review"]],
      sessions: [
        { id: "oz-1", date: "2026-12-12", time: "08:00", city: "Cape Town", venue: "Meeting point shared on booking, False Bay", seats: 10, taken: 6 }
      ]
    },
    {
      slug: "wildlife-safari-wim-van-den-heever",
      sample: true,
      title: "Wildlife Photo Safari with Wim van den Heever",
      short: "Wildlife Safari",
      price: 4500,
      level: "Intermediate",
      format: "Trip",
      duration: "2 days",
      groupSize: 8,
      host: "wim-van-den-heever",
      art: "wildlife",
      summary: "Sample premium trip. Two days of game drives with Nikon ambassador and Wildlife Photographer of the Year Wim van den Heever, loan lenses included.",
      learn: ["Long lens technique from a vehicle", "Reading animal behaviour", "Low light at dawn and dusk", "How camera traps work"],
      bring: ["Your Nikon camera", "Neutral clothing", "Bean bag or monopod (we have spares)"],
      schedule: [["Day 1", "Arrival, afternoon drive"], ["Day 2", "Dawn drive, edit session, sundowner drive"]],
      sessions: [
        { id: "wv-1", date: "2027-02-13", time: "14:00", city: "Limpopo", venue: "Private reserve, details on booking", seats: 8, taken: 5 }
      ]
    }
  ];

  var faqs = [
    ["Is the LightCraft class really free?", "Yes. LightCraft is free for anyone with a Nikon camera. It is the best place to start before picking a paid workshop."],
    ["Do I need my own camera?", "For most workshops, yes, bring your own Nikon. For a few sessions we have loan bodies and lenses, which is shown on the workshop page."],
    ["How do I pay for a paid workshop?", "Pay securely online by card or instant EFT when you book. You get an email confirmation and a calendar invite straight away."],
    ["Can I cancel or move my booking?", "Move to another date for free up to 72 hours before your session. Cancellations more than 7 days out are refunded in full."],
    ["Which workshop should I do first?", "Start with LightCraft. At the end of the class your trainer will recommend the paid workshop that fits the photos you want to take."],
    ["Is there an age limit?", "Workshops are for ages 16 and up. Under 18s are welcome with a parent or guardian."]
  ];

  var data = { people: people, workshops: workshops, faqs: faqs };
  root.NS_DATA = data;
  if (typeof module !== "undefined") module.exports = data;
})(typeof window !== "undefined" ? window : globalThis);
