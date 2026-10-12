import type { Faq } from "@/components/site/schema";
import type { Lang } from "@/components/site/seo";

// Area-specific content for each service-area page (facts from each area's Wikipedia article),
// so every page is genuinely about its neighborhood rather than a template with a name swapped.

type Local = {
  about: Record<Lang, string>;
  highlights: Record<Lang, [string, string][]>;
  faq: Record<Lang, Faq>;
};

export const LOCAL: Record<string, Local> = {
  "mahatma-gandhi-district": {
    about: {
      en: "The district took shape in 1983, when Rupa Vyas moved her Indian grocery, Jay Stores, from Rice Village to the Hillcroft area; Raja Sweets followed in 1985. Today Hillcroft Avenue — which meets I-69 — is the main way in for families driving over from Sugar Land and Missouri City, and the same road brings you to our door.",
      es: "El distrito comenzó en 1983, cuando Rupa Vyas mudó su tienda de abarrotes indios, Jay Stores, de Rice Village a la zona de Hillcroft; Raja Sweets llegó en 1985. Hoy Hillcroft Avenue —que cruza con la I-69— es la entrada principal para las familias que vienen de Sugar Land y Missouri City, y es la misma calle que te trae a nuestra puerta.",
    },
    highlights: {
      en: [
        [
          "Closest phone shop up Hillcroft",
          "About a mile from Harwin — quicker than a trip to a mall store.",
        ],
        [
          "Unlocked phones for travel",
          "Unlock your phone so it works with the carrier or SIM you choose.",
        ],
        [
          "Every accessory on one wall",
          "Cases, glass, chargers and AirPods, fitted at the counter.",
        ],
      ],
      es: [
        [
          "La tienda más cercana subiendo por Hillcroft",
          "A una milla de Harwin, más rápido que ir a una tienda del mall.",
        ],
        [
          "Celulares liberados para viajar",
          "Libera tu teléfono para usarlo con la compañía o SIM que elijas.",
        ],
        [
          "Todos los accesorios en una pared",
          "Fundas, micas, cargadores y AirPods, instalados en el mostrador.",
        ],
      ],
    },
    faq: {
      en: {
        q: "Is TIC Wireless Electronic & Repair Center inside the Mahatma Gandhi District?",
        a: "We're just north of it, on Hillcroft Avenue at 3640 Hillcroft St, Suite C — about a mile up from Harwin Drive, a two-minute drive.",
      },
      es: {
        q: "¿TIC Wireless Electronic & Repair Center está dentro del Distrito Mahatma Gandhi?",
        a: "Estamos justo al norte, sobre Hillcroft Avenue en 3640 Hillcroft St, Suite C, a una milla de Harwin Drive: dos minutos en carro.",
      },
    },
  },
  gulfton: {
    about: {
      en: "Gulfton covers about 3.2 square miles. Its apartment complexes were built in the 1960s and '70s for oil-boom workers, and from the 1980s on it became one of Houston's main immigrant communities — with Burnett Bayland Park at its heart.",
      es: "Gulfton mide unas 3.2 millas cuadradas. Sus complejos de apartamentos se construyeron en los años 60 y 70 para trabajadores del auge petrolero, y desde los 80 se convirtió en una de las principales comunidades de inmigrantes de Houston, con el parque Burnett Bayland en el centro.",
    },
    highlights: {
      en: [
        ["Se habla español", "Get help with phones, plans and repairs in Spanish or English."],
        [
          "International recharge",
          "Top up family abroad — Tigo, Digicel, Movistar, Telcel and more.",
        ],
        [
          "No-contract prepaid plans",
          "Verizon, AT&T, T-Mobile, Metro, Cricket, Boost and more, plus bill pay.",
        ],
      ],
      es: [
        [
          "Se habla español",
          "Te ayudamos con celulares, planes y reparaciones en español o inglés.",
        ],
        [
          "Recargas internacionales",
          "Recarga a tu familia: Tigo, Digicel, Movistar, Telcel y más.",
        ],
        [
          "Planes prepagados sin contrato",
          "Verizon, AT&T, T-Mobile, Metro, Cricket, Boost y más, y pago de facturas.",
        ],
      ],
    },
    faq: {
      en: {
        q: "Can I send a phone recharge to my family from near Gulfton?",
        a: "Yes. We do international mobile recharges, including Tigo, Digicel, Movistar and Telcel, at our Hillcroft store about 1.9 miles from Gulfton.",
      },
      es: {
        q: "¿Puedo mandar una recarga a mi familia cerca de Gulfton?",
        a: "Sí. Hacemos recargas internacionales, incluyendo Tigo, Digicel, Movistar y Telcel, en nuestra tienda de Hillcroft a unas 1.9 millas de Gulfton.",
      },
    },
  },
  sharpstown: {
    about: {
      en: "Developer Frank Sharp dedicated Sharpstown on March 13, 1955, planning homes, schools, shopping and parks together — a model that drew national attention. Today it's part of the Southwest Management District, with PlazAmericas as its shopping hub.",
      es: "El desarrollador Frank Sharp inauguró Sharpstown el 13 de marzo de 1955, planeando casas, escuelas, comercios y parques juntos, un modelo que llamó la atención nacional. Hoy forma parte del Southwest Management District, con PlazAmericas como centro comercial.",
    },
    highlights: {
      en: [
        [
          "Six minutes up the freeway",
          "Bellaire Blvd to the I-69 frontage road, then north on Hillcroft.",
        ],
        [
          "Same-day screen & battery repair",
          "iPhone, Samsung and Android — quoted before we start.",
        ],
        [
          "Phones with no credit needed",
          "From $40 down, with weekly, biweekly or monthly payments.",
        ],
      ],
      es: [
        [
          "Seis minutos por la autopista",
          "Bellaire Blvd a la lateral de la I-69 y luego al norte por Hillcroft.",
        ],
        [
          "Pantalla y batería el mismo día",
          "iPhone, Samsung y Android, con precio antes de empezar.",
        ],
        [
          "Celulares sin necesidad de crédito",
          "Desde $40 de enganche, con pagos semanales, quincenales o mensuales.",
        ],
      ],
    },
    faq: {
      en: {
        q: "Can I pay my Metro, Cricket or Boost bill near Sharpstown?",
        a: "Yes. We take in-person bill payments for the major prepaid carriers with no extra charges, about 2.6 miles from Sharpstown on Hillcroft.",
      },
      es: {
        q: "¿Puedo pagar mi factura de Metro, Cricket o Boost cerca de Sharpstown?",
        a: "Sí. Recibimos pagos de las principales compañías prepagadas sin cargos extra, a unas 2.6 millas de Sharpstown sobre Hillcroft.",
      },
    },
  },
  westchase: {
    about: {
      en: "Westchase runs from Westheimer Road south to the Westpark Tollway and from Gessner Road west to Houston Center Boulevard, split by Beltway 8. The Westchase Management District was created in 1995, and the area is home to more than 1,500 businesses, many tied to the energy industry.",
      es: "Westchase va de Westheimer Road al sur hasta el Westpark Tollway, y de Gessner Road al oeste hasta Houston Center Boulevard, cruzado por el Beltway 8. El Westchase Management District se creó en 1995 y la zona tiene más de 1,500 empresas, muchas ligadas a la energía.",
    },
    highlights: {
      en: [
        [
          "Lunch-break repairs",
          "Walk in without an appointment — most screen and battery repairs are same day.",
        ],
        ["Straight down Richmond", "About nine minutes east on Richmond Avenue to Hillcroft."],
        [
          "Chargers, cables & cases",
          "Everything for your work phone, in stock on the accessory wall.",
        ],
      ],
      es: [
        [
          "Reparaciones en tu hora de comida",
          "Ven sin cita: la mayoría de pantallas y baterías quedan el mismo día.",
        ],
        ["Directo por Richmond", "Unos nueve minutos al este por Richmond Avenue hasta Hillcroft."],
        [
          "Cargadores, cables y fundas",
          "Todo para tu celular del trabajo, en la pared de accesorios.",
        ],
      ],
    },
    faq: {
      en: {
        q: "Can I get my phone repaired on my lunch break from Westchase?",
        a: "Often, yes. No appointment is needed and most screen, battery and charging-port repairs are finished the same day — call (713) 339-9300 with your model for a time estimate before you head over.",
      },
      es: {
        q: "¿Puedo reparar mi celular en mi hora de comida desde Westchase?",
        a: "Muchas veces sí. No necesitas cita y la mayoría de pantallas, baterías y puertos de carga quedan el mismo día. Llama al (713) 339-9300 con tu modelo para saber el tiempo antes de salir.",
      },
    },
  },
  "galleria-uptown": {
    about: {
      en: "Uptown sits 6.2 miles west of Downtown, centered on Post Oak Boulevard and Westheimer Road and bounded roughly by Woodway, the West Loop, Richmond and Yorktown. With about 2,000 companies, it's the 17th-largest business district in the United States.",
      es: "Uptown está a 6.2 millas al oeste del centro, alrededor de Post Oak Boulevard y Westheimer Road, entre Woodway, el West Loop, Richmond y Yorktown. Con unas 2,000 empresas, es el distrito de negocios número 17 más grande de Estados Unidos.",
    },
    highlights: {
      en: [
        [
          "iPhone 18 Pro Max, unlocked",
          "The newest iPhone with lease-to-own options — call to check colors.",
        ],
        [
          "Eight minutes west on Westheimer",
          "Then south on Hillcroft, with parking right in front.",
        ],
        [
          "Real people, no kiosk lines",
          "Ask questions, compare phones and get set up at the counter.",
        ],
      ],
      es: [
        [
          "iPhone 18 Pro Max desbloqueado",
          "El iPhone más nuevo con opción a compra: llama para confirmar colores.",
        ],
        [
          "Ocho minutos al oeste por Westheimer",
          "Luego al sur por Hillcroft, con estacionamiento enfrente.",
        ],
        [
          "Atención personal, sin filas de kiosco",
          "Pregunta, compara celulares y sal configurado desde el mostrador.",
        ],
      ],
    },
    faq: {
      en: {
        q: "Do you have the iPhone 18 Pro Max near the Galleria?",
        a: "Yes — the iPhone 18 Pro Max is available unlocked at our Hillcroft store, about 3.6 miles from Uptown, with lease-to-own options. Stock changes often, so call (713) 339-9300 to confirm the color and storage.",
      },
      es: {
        q: "¿Tienen el iPhone 18 Pro Max cerca de la Galleria?",
        a: "Sí, el iPhone 18 Pro Max está disponible desbloqueado en nuestra tienda de Hillcroft, a unas 3.6 millas de Uptown, con opción a compra. El inventario cambia seguido: llama al (713) 339-9300 para confirmar color y capacidad.",
      },
    },
  },
  bellaire: {
    about: {
      en: "Bellaire was founded in 1908 by William Wright Baldwin and is still known as the “City of Homes” — a mostly residential city of 17,202 people (2020 census), surrounded by Houston and West University Place.",
      es: "Bellaire fue fundada en 1908 por William Wright Baldwin y sigue siendo la “Ciudad de los Hogares”: una ciudad principalmente residencial de 17,202 habitantes (censo 2020), rodeada por Houston y West University Place.",
    },
    highlights: {
      en: [
        [
          "Repairs for the whole family",
          "Phones, tablets and laptops — including the kids' iPads.",
        ],
        ["Protect it after the fix", "Tempered glass and a case fitted before you leave."],
        ["Upgrade without big upfront cost", "Unlocked phones from $40 down, no credit needed."],
      ],
      es: [
        [
          "Reparaciones para toda la familia",
          "Celulares, tabletas y laptops, incluyendo el iPad de los niños.",
        ],
        ["Protégelo después de repararlo", "Mica de vidrio templado y funda antes de irte."],
        [
          "Estrena sin pagar todo de una vez",
          "Celulares desbloqueados desde $40 de enganche, sin crédito.",
        ],
      ],
    },
    faq: {
      en: {
        q: "Do you repair iPads and tablets for Bellaire families?",
        a: "Yes. Along with phones, we repair tablets, laptops and computers — screens, batteries, charging ports and software. We're about 4.4 miles from Bellaire (77401).",
      },
      es: {
        q: "¿Reparan iPads y tabletas para familias de Bellaire?",
        a: "Sí. Además de celulares, reparamos tabletas, laptops y computadoras: pantallas, baterías, puertos de carga y software. Estamos a unas 4.4 millas de Bellaire (77401).",
      },
    },
  },
  alief: {
    about: {
      en: "Alief was first settled in 1894 as a farming community and grew fast in the 1970s and '80s. Most of it lies inside Houston's city limits, with part in unincorporated Harris County — and it's one of the most ethnically diverse places in the region.",
      es: "Alief se fundó en 1894 como comunidad agrícola y creció rápido en los años 70 y 80. La mayor parte está dentro de Houston y una parte en el condado de Harris no incorporado; es uno de los lugares con más diversidad de la región.",
    },
    highlights: {
      en: [
        [
          "Eleven minutes on the Westpark Tollway",
          "East to Westpark Drive, then a short hop to Hillcroft.",
        ],
        [
          "A new phone without the big bill",
          "Unlocked iPhones and Androids, no credit needed, from $40 down.",
        ],
        ["Buy, sell & trade", "Trade in your old phone toward a new one."],
      ],
      es: [
        [
          "Once minutos por el Westpark Tollway",
          "Al este hasta Westpark Drive y luego a Hillcroft.",
        ],
        [
          "Celular nuevo sin pagarlo todo",
          "iPhone y Android desbloqueados, sin crédito, desde $40 de enganche.",
        ],
        ["Compra, venta e intercambio", "Cambia tu celular usado por uno nuevo."],
      ],
    },
    faq: {
      en: {
        q: "Can I trade in my old phone near Alief?",
        a: "Yes. Bring your old phone to our Hillcroft store — about 6.6 miles from Alief — and put it toward a new one, or sell it.",
      },
      es: {
        q: "¿Puedo dar mi celular viejo a cambio cerca de Alief?",
        a: "Sí. Trae tu celular a nuestra tienda de Hillcroft, a unas 6.6 millas de Alief, y úsalo para uno nuevo o véndelo.",
      },
    },
  },
  meyerland: {
    about: {
      en: "Meyerland, between the 610 Loop and Beltway 8, is named for the Meyer family, who once owned 6,000 acres of southwest Houston. It's the center of Houston's Jewish community and home to Meyerland Plaza.",
      es: "Meyerland, entre el Loop 610 y el Beltway 8, lleva el nombre de la familia Meyer, que llegó a tener 6,000 acres del suroeste de Houston. Es el centro de la comunidad judía de Houston y hogar de Meyerland Plaza.",
    },
    highlights: {
      en: [
        ["One road, no turns to remember", "North on Hillcroft Avenue nearly the whole way."],
        ["Screen, battery & charging port", "Same-day repair for most iPhone and Samsung models."],
        ["Prepaid internet at home", "Xfinity Prepaid internet, sold and set up in store."],
      ],
      es: [
        [
          "Una sola calle, sin complicaciones",
          "Al norte por Hillcroft Avenue casi todo el camino.",
        ],
        [
          "Pantalla, batería y puerto de carga",
          "Reparación el mismo día para la mayoría de iPhone y Samsung.",
        ],
        [
          "Internet prepagado en casa",
          "Internet prepagado Xfinity, a la venta y activado en la tienda.",
        ],
      ],
    },
    faq: {
      en: {
        q: "Is there a phone repair shop near Meyerland Plaza?",
        a: "TIC Wireless Electronic & Repair Center is about 5.4 miles from Meyerland — roughly eleven minutes north on Hillcroft Avenue without traffic — with same-day repairs for most phones.",
      },
      es: {
        q: "¿Hay un taller de celulares cerca de Meyerland Plaza?",
        a: "TIC Wireless Electronic & Repair Center está a unas 5.4 millas de Meyerland, unos once minutos al norte por Hillcroft Avenue sin tráfico, con reparaciones el mismo día para la mayoría de celulares.",
      },
    },
  },
};
