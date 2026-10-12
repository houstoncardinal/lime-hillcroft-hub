import type { Faq } from "@/components/site/schema";
import type { Lang } from "@/components/site/seo";

// Practical guides that answer the questions people ask search engines and AI assistants.
// General advice plus TIC Wireless Electronic & Repair Center facts already verified elsewhere on the site — no prices and
// no carrier policies stated as fixed rules (they change).

type Section = { h: string; p: string[]; list?: string[] };
type GuideText = {
  title: string;
  /** Shorter title for search results (without the brand). */
  metaTitle: string;
  description: string;
  quick: string[];
  sections: Section[];
  faq: Faq[];
  cta: string;
};

export type Guide = {
  slug: string;
  published: string;
  updated: string;
  readMinutes: number;
  icon: "screen" | "lease" | "unlock" | "plans";
  ctaHref: Record<Lang, string>;
  text: Record<Lang, GuideText>;
};

export const GUIDES: Guide[] = [
  {
    slug: "cracked-screen-repair-or-replace",
    published: "2026-10-11",
    updated: "2026-10-11",
    readMinutes: 4,
    icon: "screen",
    ctaHref: { en: "/#repair", es: "/es#repair" },
    text: {
      en: {
        title: "Cracked phone screen: repair it or replace the phone?",
        metaTitle: "Cracked Phone Screen: Repair or Replace?",
        description:
          "Should you fix a cracked iPhone or Samsung screen or buy a new phone? What to check, when repair makes sense and how to protect it afterwards.",
        quick: [
          "If the phone still turns on and works and isn't otherwise failing, a screen repair is usually the faster, cheaper choice than a new phone.",
          "Replacing makes more sense if the phone is old, slow, has a worn-out battery, or has other damage such as a bent frame or water damage.",
          "Get a quote for your exact model first — at TIC Wireless Electronic & Repair Center the price is quoted before any work starts, and most screen repairs are done the same day.",
        ],
        sections: [
          {
            h: "Step 1: check what's actually broken",
            p: [
              "Cracks on the glass don't always mean the display underneath is damaged. Look for these signs:",
            ],
            list: [
              "Glass cracked but the picture is perfect and touch works everywhere — the top glass or screen assembly needs replacing, and acting soon stops cracks spreading.",
              "Black spots, colored lines, flickering or a dead screen — the display panel itself is damaged and the screen assembly must be replaced.",
              "Touch doesn't respond in some areas, or the phone taps by itself — the touch layer is damaged.",
              "Phone won't turn on at all after a drop — it may be more than the screen; have it diagnosed before deciding.",
            ],
          },
          {
            h: "Step 2: compare the repair with the phone's value",
            p: [
              "A simple rule: if the repair costs a small part of what a comparable phone would cost, and the rest of the phone is healthy, repair it. If the phone was already slow, the battery barely lasts a day, or it no longer gets software updates, putting that money toward a new phone is often the better deal.",
              "Remember that a new phone doesn't have to be paid all at once — TIC Wireless Electronic & Repair Center offers leasing (lease-to-own) on unlocked iPhones and Androids with no credit needed, starting at $40 down, subject to approval.",
            ],
          },
          {
            h: "Step 3: protect your data before any repair",
            p: [
              "If the screen still works enough to use, back up your phone (iCloud or Google backup) before handing it over. Remove any case and note your passcode situation — the technician may need to test the phone after the repair.",
            ],
          },
          {
            h: "Step 4: stop it happening again",
            p: [
              "Most cracked screens come from drops onto hard ground. Tempered glass screen protectors absorb a lot of impact and are cheap to replace, and a case with raised edges keeps the screen off the ground. TIC Wireless Electronic & Repair Center can fit both before you leave.",
            ],
          },
        ],
        faq: [
          {
            q: "How long does a screen repair take at TIC Wireless Electronic & Repair Center?",
            a: "Most phone screen repairs are finished the same day. You get a price and time estimate before work starts. No appointment needed.",
          },
          {
            q: "Do you repair Samsung and Android screens too?",
            a: "Yes — iPhone, Samsung and other Android phones, plus tablets and laptops.",
          },
        ],
        cta: "Get a repair quote",
      },
      es: {
        title: "Pantalla rota: ¿reparar el celular o comprar uno nuevo?",
        metaTitle: "Pantalla Rota: ¿Reparar o Comprar Otro Celular?",
        description:
          "Cómo decidir entre reparar la pantalla rota de tu iPhone o Samsung y comprar un celular nuevo: qué revisar, cuándo conviene reparar y cómo protegerlo después.",
        quick: [
          "Si el celular prende, funciona y no tiene otras fallas, cambiar la pantalla casi siempre es más rápido y barato que comprar uno nuevo.",
          "Conviene reemplazarlo si el celular ya es viejo, lento, tiene la batería gastada o tiene otros daños como el marco doblado o daño por agua.",
          "Pide primero una cotización para tu modelo: en TIC Wireless Electronic & Repair Center te damos el precio antes de empezar, y la mayoría de pantallas quedan el mismo día.",
        ],
        sections: [
          {
            h: "Paso 1: revisa qué está roto de verdad",
            p: [
              "Que el vidrio esté estrellado no siempre significa que la pantalla de abajo esté dañada. Fíjate en esto:",
            ],
            list: [
              "Vidrio roto pero la imagen se ve perfecta y el táctil funciona: hay que cambiar el vidrio o el módulo, y hacerlo pronto evita que se extienda la grieta.",
              "Manchas negras, líneas de colores, parpadeo o pantalla negra: el panel está dañado y hay que cambiar el módulo de pantalla.",
              "El táctil no responde en algunas partes o el celular toca solo: la capa táctil está dañada.",
              "El celular no prende después de una caída: puede ser más que la pantalla; pide un diagnóstico antes de decidir.",
            ],
          },
          {
            h: "Paso 2: compara la reparación con lo que vale el celular",
            p: [
              "Una regla sencilla: si la reparación cuesta una parte pequeña de lo que costaría un celular similar y lo demás funciona bien, repáralo. Si ya estaba lento, la batería no aguanta el día o ya no recibe actualizaciones, muchas veces conviene usar ese dinero para uno nuevo.",
              "Y un celular nuevo no tiene que pagarse de una vez: TIC Wireless Electronic & Repair Center ofrece arrendamiento con opción a compra en iPhone y Android desbloqueados, sin necesidad de crédito, desde $40 de enganche, sujeto a aprobación.",
            ],
          },
          {
            h: "Paso 3: protege tu información antes de reparar",
            p: [
              "Si la pantalla todavía te deja usarlo, haz un respaldo (iCloud o Google) antes de entregarlo. Quita la funda y ten a la mano tu código: el técnico puede necesitar probar el celular después de la reparación.",
            ],
          },
          {
            h: "Paso 4: que no vuelva a pasar",
            p: [
              "La mayoría de pantallas se rompen por caídas en piso duro. Las micas de vidrio templado absorben mucho del golpe y son baratas de cambiar, y una funda con bordes elevados mantiene la pantalla lejos del piso. En TIC Wireless Electronic & Repair Center te ponemos ambas antes de irte.",
            ],
          },
        ],
        faq: [
          {
            q: "¿Cuánto tarda una reparación de pantalla en TIC Wireless Electronic & Repair Center?",
            a: "La mayoría de pantallas quedan el mismo día. Te damos precio y tiempo antes de empezar. No necesitas cita.",
          },
          {
            q: "¿También reparan pantallas de Samsung y Android?",
            a: "Sí: iPhone, Samsung y otros Android, además de tabletas y laptops.",
          },
        ],
        cta: "Cotizar mi reparación",
      },
    },
  },
  {
    slug: "how-lease-to-own-works",
    published: "2026-10-11",
    updated: "2026-10-11",
    readMinutes: 4,
    icon: "lease",
    ctaHref: { en: "/leasing", es: "/es/arrendamiento" },
    text: {
      en: {
        title: "How lease-to-own works for phones, consoles and laptops (no credit needed)",
        metaTitle: "How Lease-to-Own Works for Phones & Consoles",
        description:
          "A plain-English guide to lease-to-own for iPhones, Androids, PS5, Xbox and laptops: how it works, what to bring, total cost and paying it off early.",
        quick: [
          "Lease-to-own lets you take a phone, console or laptop home today and make regular payments; when the plan is complete — or you buy it out early — it's yours.",
          "It isn't a loan, and no credit history is needed, so bad credit isn't automatically a deal-breaker. Approval still isn't guaranteed.",
          "The total cost to own is usually more than the cash price, so ask about early-payoff options. At TIC Wireless Electronic & Repair Center options start at $40 down, with weekly, biweekly or monthly payments.",
        ],
        sections: [
          {
            h: "Leasing vs. a loan",
            p: [
              "A loan works differently: a lender pays for the item and you repay the lender, usually with interest, and the item is yours from the start. Lease-to-own (also called rent-to-own) is a lease: you make regular payments to use the item, and ownership transfers to you when you complete the plan or pay the buyout amount early.",
              "Because lease-to-own isn't a credit product in the same way, it's often available to people with no credit or bad credit — which is why stores like TIC Wireless Electronic & Repair Center offer it alongside cash purchases.",
            ],
          },
          {
            h: "How it works, step by step",
            p: [],
            list: [
              "Pick the item — a phone such as the iPhone 18 Pro Max, a PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop or iPad.",
              "Apply at the counter with a valid photo ID. It takes a few minutes, and the store will tell you if anything else is needed.",
              "Pay the starting amount (at TIC Wireless Electronic & Repair Center, options start at $40 down depending on the item and plan).",
              "Take it home the same day and make your scheduled weekly, biweekly or monthly payments.",
              "Own it when the plan is complete, or pay it off early.",
            ],
          },
          {
            h: "What to ask before you sign",
            p: ["Good questions to ask any store offering lease-to-own:"],
            list: [
              "What is the total cost if I make every payment to the end?",
              "What does it cost to pay it off early, and when can I do that?",
              "What happens if I miss a payment?",
              "Is the device new and unlocked, and does it include a warranty?",
            ],
          },
          {
            h: "When it's a good fit",
            p: [
              "Lease-to-own is useful when you need a working phone or laptop now — for work, school or staying in touch — and can't or don't want to pay the full price at once or use credit. If you can, paying it off early usually lowers the total cost.",
            ],
          },
        ],
        faq: [
          {
            q: "Can I get a PS5 or iPhone with bad credit?",
            a: "Often, yes. Lease-to-own doesn't require a credit history, so bad credit isn't automatically a deal-breaker — but approval isn't guaranteed. It takes a few minutes in store to find out.",
          },
          {
            q: "What do I need to bring?",
            a: "A valid photo ID. TIC Wireless Electronic & Repair Center will tell you if anything else is needed for your application.",
          },
        ],
        cta: "See leasing options",
      },
      es: {
        title: "Cómo funciona el arrendamiento con opción a compra (sin crédito)",
        metaTitle: "Cómo Funciona el Arrendamiento con Opción a Compra",
        description:
          "Guía sencilla del arrendamiento con opción a compra para iPhone, Android, PS5, Xbox y laptops: cómo funciona, qué traer, costo total y cómo liquidarlo.",
        quick: [
          "Con el arrendamiento con opción a compra te llevas hoy un celular, consola o laptop y haces pagos regulares; al terminar el plan —o si lo liquidas antes— es tuyo.",
          "No es un préstamo y no necesitas historial de crédito, así que el mal crédito no es impedimento automático. La aprobación no está garantizada.",
          "El costo total suele ser mayor que el precio de contado, así que pregunta por la liquidación anticipada. En TIC Wireless Electronic & Repair Center las opciones empiezan desde $40 de enganche, con pagos semanales, quincenales o mensuales.",
        ],
        sections: [
          {
            h: "Arrendamiento vs. préstamo",
            p: [
              "Un préstamo funciona distinto: alguien paga el equipo y tú le pagas a esa empresa, normalmente con intereses, y el equipo es tuyo desde el inicio. El arrendamiento con opción a compra es una renta: haces pagos regulares para usarlo y pasa a ser tuyo al terminar el plan o al pagar la liquidación anticipada.",
              "Como no funciona igual que un crédito, muchas veces está disponible para personas sin crédito o con mal crédito, y por eso tiendas como TIC Wireless Electronic & Repair Center lo ofrecen junto con las compras de contado.",
            ],
          },
          {
            h: "Cómo funciona, paso a paso",
            p: [],
            list: [
              "Escoge el equipo: un celular como el iPhone 18 Pro Max, un PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop o iPad.",
              "Aplica en el mostrador con una identificación oficial con foto. Toma unos minutos y te avisamos si se necesita algo más.",
              "Da el pago inicial (en TIC Wireless Electronic & Repair Center, desde $40 de enganche según el equipo y el plan).",
              "Llévatelo el mismo día y haz tus pagos semanales, quincenales o mensuales.",
              "Es tuyo al terminar el plan, o liquídalo antes.",
            ],
          },
          {
            h: "Qué preguntar antes de firmar",
            p: ["Buenas preguntas para cualquier tienda que ofrezca arrendamiento:"],
            list: [
              "¿Cuánto pago en total si hago todos los pagos hasta el final?",
              "¿Cuánto cuesta liquidarlo antes y cuándo puedo hacerlo?",
              "¿Qué pasa si me atraso en un pago?",
              "¿El equipo es nuevo, está desbloqueado y tiene garantía?",
            ],
          },
          {
            h: "Cuándo conviene",
            p: [
              "Conviene cuando necesitas un celular o laptop que funcione ya —para el trabajo, la escuela o estar en contacto— y no puedes o no quieres pagar todo de una vez ni usar crédito. Si puedes, liquidarlo antes normalmente baja el costo total.",
            ],
          },
        ],
        faq: [
          {
            q: "¿Puedo sacar un PS5 o iPhone con mal crédito?",
            a: "Muchas veces sí. El arrendamiento no requiere historial de crédito, así que el mal crédito no es impedimento automático, aunque la aprobación no está garantizada. En unos minutos en la tienda sabes si calificas.",
          },
          {
            q: "¿Qué necesito traer?",
            a: "Una identificación oficial con foto. TIC Wireless Electronic & Repair Center te dirá si se necesita algo más para tu solicitud.",
          },
        ],
        cta: "Ver opciones de arrendamiento",
      },
    },
  },
  {
    slug: "how-to-unlock-your-phone",
    published: "2026-10-11",
    updated: "2026-10-11",
    readMinutes: 4,
    icon: "unlock",
    ctaHref: { en: "/#services", es: "/es#services" },
    text: {
      en: {
        title: "How to unlock your phone and switch carriers",
        metaTitle: "How to Unlock Your Phone & Switch Carriers",
        description:
          "What a carrier-locked phone is, how to check if yours is locked, what carriers usually require, and how to switch prepaid carriers and keep your number.",
        quick: [
          "A carrier-locked phone only works with the carrier that sold it; an unlocked phone works with any compatible carrier or SIM.",
          "To check, put in a SIM from another carrier — or look in your phone's settings — and see if it connects.",
          "Carriers usually require the phone to be paid off and not reported lost or stolen before unlocking. Rules vary by carrier, so check yours — or bring the phone to TIC Wireless Electronic & Repair Center and we'll check it for you.",
        ],
        sections: [
          {
            h: "Locked vs. unlocked",
            p: [
              "Many phones bought from a carrier — especially on a payment plan or a prepaid deal — are locked to that carrier's network. An unlocked phone can use a SIM or eSIM from any compatible carrier, which matters if you want a cheaper plan, are switching carriers, or travel abroad and want a local SIM.",
            ],
          },
          {
            h: "How to tell if your phone is locked",
            p: [],
            list: [
              "iPhone: Settings → General → About and look for “Carrier Lock” — “No SIM restrictions” means it's unlocked.",
              "Android: the easiest test is to insert a SIM from a different carrier; if you see “SIM not supported” or no service, it's likely locked.",
              "Not sure? Bring it in — TIC Wireless Electronic & Repair Center can check it at the counter.",
            ],
          },
          {
            h: "What carriers usually require",
            p: [
              "Each carrier sets its own unlocking rules, but they commonly include: the phone is fully paid off, the account is in good standing, the phone has been active on the network for a minimum period, and it isn't reported lost or stolen. Check your carrier's current policy before you switch.",
            ],
          },
          {
            h: "Switching carriers without losing your number",
            p: [],
            list: [
              "Don't cancel your old service first — porting your number needs the old account active.",
              "Get your account number and number-transfer PIN from your current carrier.",
              "Back up your phone and make sure it's unlocked.",
              "Pick the new prepaid plan and activate it — TIC Wireless Electronic & Repair Center offers Verizon Prepaid, AT&T Prepaid, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Lyca, GoSmart and Gen Mobile.",
            ],
          },
        ],
        faq: [
          {
            q: "Can TIC Wireless Electronic & Repair Center unlock my phone?",
            a: "Yes, we unlock phones so you can use the carrier you choose. Bring your phone in and we'll check it first.",
          },
          {
            q: "Will unlocking erase my phone?",
            a: "Unlocking doesn't normally erase your data, but always back up first — especially before switching SIMs or carriers.",
          },
        ],
        cta: "Ask about unlocking",
      },
      es: {
        title: "Cómo liberar tu celular y cambiarte de compañía",
        metaTitle: "Cómo Liberar tu Celular y Cambiarte de Compañía",
        description:
          "Qué es un celular bloqueado, cómo saber si el tuyo lo está, qué piden las compañías para liberarlo y cómo cambiarte de compañía sin perder tu número.",
        quick: [
          "Un celular bloqueado solo funciona con la compañía que lo vendió; uno liberado funciona con cualquier compañía o SIM compatible.",
          "Para saberlo, pon un SIM de otra compañía —o revisa los ajustes— y fíjate si se conecta.",
          "Las compañías normalmente piden que el celular esté pagado y sin reporte de robo o extravío. Las reglas cambian según la compañía: revisa la tuya o trae tu celular a TIC Wireless Electronic & Repair Center y lo revisamos.",
        ],
        sections: [
          {
            h: "Bloqueado vs. liberado",
            p: [
              "Muchos celulares comprados con una compañía —sobre todo a plazos o en promoción prepagada— están bloqueados a esa red. Uno liberado puede usar el SIM o eSIM de cualquier compañía compatible, lo que importa si quieres un plan más barato, cambiarte de compañía o viajar y usar un SIM local.",
            ],
          },
          {
            h: "Cómo saber si tu celular está bloqueado",
            p: [],
            list: [
              "iPhone: Ajustes → General → Información y busca “Bloqueo del operador”; “Sin restricciones de SIM” significa que está liberado.",
              "Android: la prueba más fácil es poner un SIM de otra compañía; si dice “SIM no compatible” o no hay señal, probablemente está bloqueado.",
              "¿No estás seguro? Tráelo y en TIC Wireless Electronic & Repair Center lo revisamos en el mostrador.",
            ],
          },
          {
            h: "Lo que suelen pedir las compañías",
            p: [
              "Cada compañía tiene sus reglas, pero normalmente piden: que el celular esté totalmente pagado, que la cuenta esté al corriente, que haya estado activo un tiempo mínimo y que no tenga reporte de robo o extravío. Revisa la política actual de tu compañía antes de cambiarte.",
            ],
          },
          {
            h: "Cambiarte de compañía sin perder tu número",
            p: [],
            list: [
              "No canceles primero tu servicio: para pasar tu número, la cuenta vieja debe estar activa.",
              "Pide a tu compañía actual tu número de cuenta y el PIN de transferencia.",
              "Respalda tu celular y asegúrate de que esté liberado.",
              "Elige y activa tu nuevo plan prepagado: TIC Wireless Electronic & Repair Center tiene Verizon Prepaid, AT&T Prepaid, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Lyca, GoSmart y Gen Mobile.",
            ],
          },
        ],
        faq: [
          {
            q: "¿TIC Wireless Electronic & Repair Center puede liberar mi celular?",
            a: "Sí, liberamos celulares para que uses la compañía que quieras. Tráelo y primero lo revisamos.",
          },
          {
            q: "¿Liberar el celular borra mi información?",
            a: "Normalmente no borra tus datos, pero siempre haz un respaldo antes, sobre todo si vas a cambiar de SIM o de compañía.",
          },
        ],
        cta: "Preguntar por liberación",
      },
    },
  },
  {
    slug: "choosing-a-prepaid-plan-houston",
    published: "2026-10-11",
    updated: "2026-10-11",
    readMinutes: 3,
    icon: "plans",
    ctaHref: { en: "/#services", es: "/es#services" },
    text: {
      en: {
        title: "How to choose a prepaid phone plan in Houston",
        metaTitle: "How to Choose a Prepaid Phone Plan in Houston",
        description:
          "Prepaid vs. postpaid, how much data you need, coverage, international calling and paying in person — a practical guide to picking a prepaid plan in Houston.",
        quick: [
          "Prepaid plans have no contract and no credit check: you pay before each month, so there are no surprise bills.",
          "Choose by three things: how much data you use, which network covers your home and work best, and whether you call or text family abroad.",
          "At TIC Wireless Electronic & Repair Center on Hillcroft you can compare Verizon Prepaid, AT&T Prepaid, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Lyca, GoSmart and Gen Mobile, and pay your bill in person with no extra charges.",
        ],
        sections: [
          {
            h: "Prepaid vs. postpaid",
            p: [
              "Postpaid plans bill you after you use the service and usually involve a credit check. Prepaid plans are paid up front, need no credit check or contract, and are easy to change month to month — which is why they're popular for budgeting, for people new to the U.S., and as a second line.",
            ],
          },
          {
            h: "Work out how much data you need",
            p: [],
            list: [
              "Light use (messaging, maps, email, mostly on Wi-Fi): a smaller data plan is often enough.",
              "Everyday streaming and social media away from Wi-Fi: look at larger or unlimited plans.",
              "Hotspot for a laptop or tablet: check the plan's hotspot allowance specifically.",
              "Check your current usage in your phone's settings before choosing.",
            ],
          },
          {
            h: "Coverage, calling abroad and paying",
            p: [
              "Ask friends nearby which network works best inside their homes and workplaces — coverage varies street by street. If you call family abroad, compare plans' international calling and consider international recharge for their phones (TIC Wireless Electronic & Repair Center offers Tigo, Digicel, Movistar, Telcel and more). Prefer cash or in-person payments? You can pay your prepaid bill at the store.",
            ],
          },
          {
            h: "Keep your number when you switch",
            p: [
              "You can usually keep your number when changing prepaid carriers. Keep the old line active until the transfer is done, and have your account number and transfer PIN ready. Your phone also needs to be unlocked to work on a different network.",
            ],
          },
        ],
        faq: [
          {
            q: "Which prepaid carriers does TIC Wireless Electronic & Repair Center offer?",
            a: "Verizon Prepaid, AT&T Prepaid, T-Mobile, Metro by T-Mobile, Cricket, Boost Mobile, Simple Mobile, Lyca Mobile, GoSmart and Gen Mobile — plus Xfinity Prepaid home internet.",
          },
          {
            q: "How much are prepaid plans?",
            a: "Prices depend on the carrier and change often. Call (713) 339-9300 or stop by and we'll compare current plans for you.",
          },
        ],
        cta: "Compare plans in store",
      },
      es: {
        title: "Cómo elegir un plan prepagado en Houston",
        metaTitle: "Cómo Elegir un Plan Prepagado en Houston",
        description:
          "Prepagado vs. pospago, cuántos datos necesitas, cobertura, llamadas internacionales y pago en persona: guía práctica para elegir un plan prepagado en Houston.",
        quick: [
          "Los planes prepagados no tienen contrato ni revisión de crédito: pagas antes de cada mes, así que no hay sorpresas.",
          "Elige por tres cosas: cuántos datos usas, qué red tiene mejor señal en tu casa y trabajo, y si llamas o mandas mensajes a tu familia en otro país.",
          "En TIC Wireless Electronic & Repair Center sobre Hillcroft puedes comparar Verizon Prepaid, AT&T Prepaid, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Lyca, GoSmart y Gen Mobile, y pagar tu factura en persona sin cargos extra.",
        ],
        sections: [
          {
            h: "Prepagado vs. pospago",
            p: [
              "Los planes de pospago te cobran después de usar el servicio y casi siempre revisan tu crédito. Los prepagados se pagan por adelantado, no piden crédito ni contrato y se pueden cambiar mes con mes; por eso son populares para cuidar el presupuesto, para quienes acaban de llegar a EE. UU. y como segunda línea.",
            ],
          },
          {
            h: "Calcula cuántos datos necesitas",
            p: [],
            list: [
              "Uso ligero (mensajes, mapas, correo, casi siempre con Wi-Fi): un plan con pocos datos suele bastar.",
              "Videos y redes sociales a diario sin Wi-Fi: busca planes grandes o ilimitados.",
              "Hotspot para laptop o tableta: revisa cuánto hotspot incluye el plan.",
              "Revisa tu consumo actual en los ajustes de tu celular antes de elegir.",
            ],
          },
          {
            h: "Cobertura, llamadas al extranjero y pagos",
            p: [
              "Pregunta a vecinos qué red funciona mejor dentro de sus casas y trabajos: la cobertura cambia de calle a calle. Si llamas a tu familia en otro país, compara las llamadas internacionales y considera las recargas internacionales para sus celulares (TIC Wireless Electronic & Repair Center tiene Tigo, Digicel, Movistar, Telcel y más). ¿Prefieres pagar en efectivo o en persona? Puedes pagar tu factura en la tienda.",
            ],
          },
          {
            h: "Conserva tu número al cambiarte",
            p: [
              "Normalmente puedes conservar tu número al cambiar de compañía prepagada. Mantén activa la línea vieja hasta que termine la transferencia y ten a la mano tu número de cuenta y PIN de transferencia. Tu celular también debe estar liberado para funcionar en otra red.",
            ],
          },
        ],
        faq: [
          {
            q: "¿Qué compañías prepagadas tiene TIC Wireless Electronic & Repair Center?",
            a: "Verizon Prepaid, AT&T Prepaid, T-Mobile, Metro by T-Mobile, Cricket, Boost Mobile, Simple Mobile, Lyca Mobile, GoSmart y Gen Mobile, además de internet prepagado Xfinity.",
          },
          {
            q: "¿Cuánto cuestan los planes prepagados?",
            a: "Los precios dependen de la compañía y cambian seguido. Llama al (713) 339-9300 o ven a la tienda y comparamos los planes actuales.",
          },
        ],
        cta: "Comparar planes en la tienda",
      },
    },
  },
];

export const findGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
