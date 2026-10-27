import { ADDRESS, PHONE } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";

// The store's policies, in English and Spanish. The website shows these directly, and
// `npm run shopify:policies` turns them into the text pasted into Shopify admin (Settings →
// Policies), so the checkout links say the same thing.
//
// Terms the owner set (Oct 27, 2026): 14-day returns on devices with a 15% restocking fee once
// opened or activated; manufacturer warranty only on devices (pre-owned sold as-is after
// testing); 14-day part warranty on repairs, none on liquid-damaged devices; shipping within the
// continental US plus store pickup. Accessories are final sale (as the accessories page says).

export const POLICY_UPDATED = "2026-10-27";

export type PolicyKey = "privacy" | "returns" | "shipping" | "terms" | "warranty";
/** A paragraph, or a bulleted list. */
export type Block = string | { list: string[] };
export type Section = { id: string; title: string; body: Block[] };
export type PolicyDoc = {
  /** One or two sentences: what this policy covers. Also the page's search description. */
  summary: string;
  /** The few things most people need, shown first. */
  points: string[];
  sections: Section[];
};

const STORE = "TIC Wireless Electronic & Repair Center";
const SITE = "www.ticwirelesstx.com";
const PORTALS = "Progressive Leasing, American First Finance (AFF) and Payvantage";

const contact = {
  en: {
    id: "contact",
    title: "Contact us",
    body: [
      `${STORE}, ${ADDRESS}. Call ${PHONE}, or visit us Monday to Saturday 9 AM – 8 PM and Sunday 9 AM – 5 PM.`,
    ],
  },
  es: {
    id: "contacto",
    title: "Contáctanos",
    body: [
      `${STORE}, ${ADDRESS}. Llama al ${PHONE} o visítanos de lunes a sábado de 9 AM a 8 PM y el domingo de 9 AM a 5 PM.`,
    ],
  },
} satisfies Record<Lang, Section>;

export const POLICIES: Record<PolicyKey, Record<Lang, PolicyDoc>> = {
  // ---------------------------------------------------------------- returns
  returns: {
    en: {
      summary:
        "Return phones, tablets, laptops and game consoles within 14 days. Unopened items get a full refund; opened or activated items have a 15% restocking fee. Accessories are final sale.",
      points: [
        "14 days to return a phone, tablet, laptop or game console, counted from the day you buy it in store or the day an online order is delivered.",
        "Unopened and still sealed: full refund. Opened, set up or activated: refund minus a 15% restocking fee.",
        "Defective or not as described: full refund, replacement or repair at no cost, with no restocking fee.",
        "Accessories (cases, screen protectors, chargers, audio, smartwatches and more) are final sale, unless they're defective.",
      ],
      sections: [
        {
          id: "devices",
          title: "Phones, tablets, laptops and game consoles",
          body: [
            "You can return a device within 14 days. For in-store purchases the 14 days start on the day you buy; for online orders they start on the day the order is delivered or picked up.",
            "To be accepted for return, the device must:",
            {
              list: [
                "be in the same condition you received it, with no new scratches, cracks, dents or liquid exposure;",
                "come back with everything it came with: the box, charger and cable, SIM tool, manuals and any free items;",
                "be signed out of every account and reset. Turn off Find My and sign out of your Apple ID on Apple devices, and remove your Google and Samsung accounts on Android devices, then erase the device. We can't accept a device that is still locked to your account;",
                "not have been reported lost or stolen, or blocked by a carrier, after you bought it.",
              ],
            },
            "If the device is unopened and still in its sealed packaging, you get a full refund. If it has been opened, set up or activated with a carrier, we refund the purchase price minus a 15% restocking fee, which covers inspecting, resetting and repackaging the device.",
          ],
        },
        {
          id: "accessories",
          title: "Accessories",
          body: [
            "Accessories are final sale. That includes cases, screen protectors and installed glass, chargers, cables, power banks, car mounts, earbuds and headphones, speakers, smartwatches, memory cards and gaming accessories. Bring your phone when you shop and we'll help you check the fit before you buy.",
            "If an accessory is defective, bring it back within 14 days with your receipt and we'll exchange it for the same item. If we don't have the same item, we'll offer a similar one or a refund.",
          ],
        },
        {
          id: "defective",
          title: "Defective or not as described",
          body: [
            "If something you bought from us doesn't work properly, or isn't what we described (wrong model, storage size or color), tell us within 14 days. We'll check it in store and, at your choice, refund it in full, replace it with the same model, or repair it. No restocking fee applies.",
            "After 14 days, new devices are covered by the manufacturer's warranty. See our Warranty policy for how that works.",
          ],
        },
        {
          id: "not-returnable",
          title: "What can't be returned",
          body: [
            {
              list: [
                "Prepaid plans, airtime, top-ups, phone bill payments and international recharges once they've been processed. Carriers don't let us reverse them.",
                "Service fees for work already done, such as activation, unlocking, setup or data transfer.",
                "Repairs. These are covered by the repair warranty instead (see our Warranty policy).",
                "Devices damaged after purchase, exposed to liquid, missing parts, or still locked to an account.",
                "Anything bought more than 14 days ago, unless it's covered by a warranty.",
              ],
            },
          ],
        },
        {
          id: "how",
          title: "How to return something",
          body: [
            `In store: bring the item to ${ADDRESS} during store hours, with your receipt or online order number and a valid photo ID that matches the name on the purchase.`,
            `By mail (online orders): call ${PHONE} first so we can give you return instructions. Ship the item in protective packaging, insured and with tracking. You pay return shipping unless the item is defective or we sent the wrong item. We aren't responsible for items lost or damaged on the way back to us, so please insure the package.`,
          ],
        },
        {
          id: "refunds",
          title: "Refunds",
          body: [
            "We inspect returns as soon as we receive them, usually the same day for in-store returns. Approved refunds go back to the way you paid:",
            {
              list: [
                "Card and online payments: back to the same card or account. We send the refund within 3 business days of approving it; your bank may take 5–10 business days to show it.",
                "Cash: refunded in cash in store.",
                "Shop Pay Installments: refunded to Affirm, which adjusts or closes your payment plan.",
                "Trade-in credit: the part of a purchase paid with trade-in credit is refunded as store credit.",
              ],
            },
            "Shipping charges on online orders are not refundable, unless the return is because of our error or a defect.",
          ],
        },
        {
          id: "leasing",
          title: "Lease-to-own purchases",
          body: [
            `If you got your device through lease-to-own with ${PORTALS}, the leasing company owns the device during the lease, and your lease agreement explains how returns and early returns work. Come to the store within 14 days and we'll process the return with your leasing company under their rules. Payments and fees you paid to the leasing company are handled under your lease agreement.`,
          ],
        },
        {
          id: "exchanges",
          title: "Exchanges",
          body: [
            "Within 14 days you can exchange a device for a different model, storage size or color, as long as it meets the return conditions above. If the new device costs more, you pay the difference; if it costs less, we refund the difference. An exchange of an opened device for a different model is treated as a return, so the 15% restocking fee applies.",
          ],
        },
        contact.en,
      ],
    },
    es: {
      summary:
        "Devuelve celulares, tabletas, laptops y consolas dentro de 14 días. Si no se abrió, reembolso completo; si se abrió o activó, hay un cargo de reposición del 15%. Los accesorios son venta final.",
      points: [
        "14 días para devolver un celular, tableta, laptop o consola, contados desde el día de la compra en la tienda o el día en que se entrega un pedido en línea.",
        "Sin abrir y con su sello: reembolso completo. Abierto, configurado o activado: reembolso menos un cargo de reposición del 15%.",
        "Defectuoso o distinto a lo descrito: reembolso completo, reemplazo o reparación sin costo, sin cargo de reposición.",
        "Los accesorios (fundas, micas, cargadores, audio, relojes inteligentes y más) son venta final, salvo que estén defectuosos.",
      ],
      sections: [
        {
          id: "equipos",
          title: "Celulares, tabletas, laptops y consolas",
          body: [
            "Puedes devolver un equipo dentro de 14 días. En compras en la tienda, los 14 días empiezan el día de la compra; en pedidos en línea, el día en que se entrega o se recoge el pedido.",
            "Para aceptar la devolución, el equipo debe:",
            {
              list: [
                "estar en las mismas condiciones en que lo recibiste, sin rayones, grietas, golpes ni contacto con líquidos nuevos;",
                "regresar con todo lo que traía: caja, cargador y cable, herramienta para SIM, manuales y artículos de regalo;",
                "tener todas las cuentas cerradas y estar restablecido. En equipos Apple, desactiva Buscar y cierra tu Apple ID; en Android, quita tus cuentas de Google y Samsung; después borra el equipo. No podemos aceptar un equipo que siga bloqueado a tu cuenta;",
                "no haber sido reportado como perdido o robado, ni bloqueado por una compañía, después de tu compra.",
              ],
            },
            "Si el equipo no se ha abierto y conserva su sello, te devolvemos el total. Si se abrió, se configuró o se activó con una compañía, te devolvemos el precio de compra menos un cargo de reposición del 15%, que cubre revisar, restablecer y volver a empacar el equipo.",
          ],
        },
        {
          id: "accesorios",
          title: "Accesorios",
          body: [
            "Los accesorios son venta final. Eso incluye fundas, micas y vidrio templado instalado, cargadores, cables, baterías portátiles, soportes para auto, audífonos, bocinas, relojes inteligentes, memorias y accesorios de gaming. Trae tu celular cuando compres y te ayudamos a revisar que quede bien antes de pagar.",
            "Si un accesorio sale defectuoso, tráelo dentro de 14 días con tu recibo y lo cambiamos por el mismo artículo. Si no tenemos el mismo, te ofrecemos uno similar o un reembolso.",
          ],
        },
        {
          id: "defectuosos",
          title: "Equipos defectuosos o distintos a lo descrito",
          body: [
            "Si algo que nos compraste no funciona bien o no es lo que describimos (otro modelo, capacidad o color), avísanos dentro de 14 días. Lo revisamos en la tienda y, según prefieras, te devolvemos el total, lo cambiamos por el mismo modelo o lo reparamos. No se cobra cargo de reposición.",
            "Después de 14 días, los equipos nuevos están cubiertos por la garantía del fabricante. Consulta nuestra política de Garantía para saber cómo funciona.",
          ],
        },
        {
          id: "no-retornables",
          title: "Lo que no se puede devolver",
          body: [
            {
              list: [
                "Planes prepagados, tiempo aire, recargas, pagos de factura y recargas internacionales una vez procesados. Las compañías no nos permiten revertirlos.",
                "Cargos por servicios ya realizados, como activación, liberación, configuración o transferencia de datos.",
                "Reparaciones. Estas tienen su propia garantía (consulta nuestra política de Garantía).",
                "Equipos dañados después de la compra, mojados, incompletos o todavía bloqueados a una cuenta.",
                "Cualquier compra de hace más de 14 días, salvo que la cubra una garantía.",
              ],
            },
          ],
        },
        {
          id: "como",
          title: "Cómo hacer una devolución",
          body: [
            `En la tienda: trae el artículo a ${ADDRESS} en horario de la tienda, con tu recibo o número de pedido y una identificación oficial con foto que coincida con el nombre de la compra.`,
            `Por correo (pedidos en línea): llama primero al ${PHONE} para darte las instrucciones. Envía el artículo bien protegido, asegurado y con número de rastreo. Tú pagas el envío de regreso, salvo que el artículo esté defectuoso o te hayamos enviado otro. No nos hacemos responsables de artículos perdidos o dañados en el camino, así que asegura el paquete.`,
          ],
        },
        {
          id: "reembolsos",
          title: "Reembolsos",
          body: [
            "Revisamos las devoluciones en cuanto las recibimos; en la tienda, normalmente el mismo día. Los reembolsos aprobados regresan a la forma en que pagaste:",
            {
              list: [
                "Tarjeta y pagos en línea: a la misma tarjeta o cuenta. Enviamos el reembolso dentro de 3 días hábiles después de aprobarlo; tu banco puede tardar de 5 a 10 días hábiles en reflejarlo.",
                "Efectivo: se reembolsa en efectivo en la tienda.",
                "Shop Pay Installments: se reembolsa a Affirm, que ajusta o cierra tu plan de pagos.",
                "Crédito por intercambio: la parte de la compra pagada con crédito por intercambio se reembolsa como crédito en la tienda.",
              ],
            },
            "Los cargos de envío de pedidos en línea no son reembolsables, salvo que la devolución se deba a un error nuestro o a un defecto.",
          ],
        },
        {
          id: "arrendamiento",
          title: "Compras con arrendamiento",
          body: [
            `Si obtuviste tu equipo con arrendamiento con opción a compra de ${PORTALS}, la compañía de arrendamiento es dueña del equipo durante el contrato, y tu contrato explica cómo funcionan las devoluciones y las devoluciones anticipadas. Ven a la tienda dentro de 14 días y tramitamos la devolución con tu compañía de arrendamiento según sus reglas. Los pagos y cargos que hiciste a la compañía de arrendamiento se manejan según tu contrato.`,
          ],
        },
        {
          id: "cambios",
          title: "Cambios",
          body: [
            "Dentro de 14 días puedes cambiar un equipo por otro modelo, capacidad o color, siempre que cumpla las condiciones de devolución anteriores. Si el nuevo cuesta más, pagas la diferencia; si cuesta menos, te reembolsamos la diferencia. Cambiar un equipo abierto por otro modelo cuenta como devolución, así que aplica el cargo de reposición del 15%.",
          ],
        },
        contact.es,
      ],
    },
  },

  // ---------------------------------------------------------------- warranty
  warranty: {
    en: {
      summary:
        "New devices carry the manufacturer's warranty. Pre-owned devices are tested and sold as-is. Repairs have a 14-day warranty on the part we install; liquid-damaged devices aren't covered.",
      points: [
        "New devices: covered by the manufacturer's warranty (Apple, Samsung and others). We'll help you start a claim.",
        "Pre-owned devices: tested before sale and sold as-is, with no store warranty after the 14-day return window.",
        "Repairs: 14-day warranty on the part we install and our work on it.",
        "Liquid-damaged devices: no warranty on any repair.",
      ],
      sections: [
        {
          id: "new",
          title: "New devices",
          body: [
            "New phones, tablets, laptops and game consoles come with the manufacturer's warranty. Apple and Samsung, for example, include a one-year limited warranty on new devices in the US. The manufacturer, not TIC Wireless, provides that warranty and decides what it covers.",
            "To use it, contact the manufacturer (Apple Support or Samsung Support) or visit an authorized service provider. Bring your receipt; we're happy to help you start the claim. For the first 14 days you can also come to us under our Returns policy.",
          ],
        },
        {
          id: "pre-owned",
          title: "Pre-owned and open-box devices",
          body: [
            "We test every pre-owned device before we sell it, and we'll tell you about any wear or known issue before you buy. Pre-owned devices are sold AS IS, with no TIC Wireless warranty after the 14-day return window.",
            "Some pre-owned devices still have part of their original manufacturer's warranty. You can check an Apple device at checkcoverage.apple.com, or contact Samsung with the serial number or IMEI.",
          ],
        },
        {
          id: "accessories",
          title: "Accessories",
          body: [
            "Accessories carry their manufacturer's warranty, where one is offered. If an accessory is defective within 14 days, we'll exchange it (see our Returns policy).",
          ],
        },
        {
          id: "repairs",
          title: "Repairs",
          body: [
            "Every repair comes with a 14-day warranty on the part we install and our work on it, starting on the day you pick up your device. If the part fails because of a defect or because of how we installed it (for example, a new screen stops responding to touch, or a new battery won't hold a charge), bring the device back with your receipt and we'll fix it at no cost.",
            "The repair warranty doesn't cover:",
            {
              list: [
                "new physical damage, such as drops, cracks, bends or pressure marks;",
                "liquid exposure of any kind;",
                "parts we didn't replace, or problems that weren't part of the repair;",
                "devices opened or repaired by anyone else after our repair;",
                "software problems, lost data, or carrier and account locks.",
              ],
            },
          ],
        },
        {
          id: "liquid",
          title: "Liquid-damaged devices",
          body: [
            "Liquid damage spreads inside a device and can cause new failures long after a repair, so repairs on liquid-damaged devices carry no warranty. We'll always tell you before we start if we see signs of liquid damage.",
          ],
        },
        {
          id: "before-repair",
          title: "Before a repair",
          body: [
            "Back up your data before any repair; we aren't responsible for data lost during a repair. We give you the price before we start, and we only do the work you approve. Opening a phone can reduce its water resistance, and a repair by an independent shop may affect any remaining manufacturer's warranty.",
          ],
        },
        {
          id: "disclaimer",
          title: "Legal notice",
          body: [
            "EXCEPT FOR THE REPAIR WARRANTY DESCRIBED ABOVE AND ANY MANUFACTURER'S WARRANTY, AND TO THE FULLEST EXTENT ALLOWED BY LAW, TIC WIRELESS MAKES NO OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. PRE-OWNED DEVICES ARE SOLD AS IS.",
            "This doesn't limit any right you have under Texas or federal law that can't be waived, or your rights under our Returns policy.",
          ],
        },
        contact.en,
      ],
    },
    es: {
      summary:
        "Equipos nuevos: garantía del fabricante. Equipos usados: se prueban y se venden tal cual. Reparaciones: 14 días de garantía en la pieza que instalamos; los equipos mojados no tienen garantía.",
      points: [
        "Equipos nuevos: cubiertos por la garantía del fabricante (Apple, Samsung y otros). Te ayudamos a iniciar el reclamo.",
        "Equipos usados: se prueban antes de venderse y se venden en el estado en que se encuentran, sin garantía de la tienda después de los 14 días para devolución.",
        "Reparaciones: 14 días de garantía en la pieza que instalamos y en nuestro trabajo.",
        "Equipos dañados por líquidos: ninguna reparación tiene garantía.",
      ],
      sections: [
        {
          id: "nuevos",
          title: "Equipos nuevos",
          body: [
            "Los celulares, tabletas, laptops y consolas nuevos tienen la garantía del fabricante. Apple y Samsung, por ejemplo, incluyen una garantía limitada de un año en equipos nuevos en EE. UU. Esa garantía la da el fabricante, no TIC Wireless, y el fabricante decide qué cubre.",
            "Para usarla, comunícate con el fabricante (Soporte de Apple o Soporte de Samsung) o visita un proveedor de servicio autorizado. Trae tu recibo; con gusto te ayudamos a iniciar el reclamo. Durante los primeros 14 días también puedes venir con nosotros según nuestra política de Devoluciones.",
          ],
        },
        {
          id: "usados",
          title: "Equipos usados y de caja abierta",
          body: [
            "Probamos cada equipo usado antes de venderlo y te decimos si tiene desgaste o algún detalle conocido antes de que lo compres. Los equipos usados se venden EN EL ESTADO EN QUE SE ENCUENTRAN, sin garantía de TIC Wireless después de los 14 días para devolución.",
            "Algunos equipos usados todavía conservan parte de la garantía original del fabricante. Puedes revisar un equipo Apple en checkcoverage.apple.com, o consultar a Samsung con el número de serie o IMEI.",
          ],
        },
        {
          id: "accesorios",
          title: "Accesorios",
          body: [
            "Los accesorios tienen la garantía de su fabricante, cuando la ofrece. Si un accesorio sale defectuoso dentro de 14 días, lo cambiamos (consulta nuestra política de Devoluciones).",
          ],
        },
        {
          id: "reparaciones",
          title: "Reparaciones",
          body: [
            "Cada reparación tiene 14 días de garantía en la pieza que instalamos y en nuestro trabajo, a partir del día en que recoges tu equipo. Si la pieza falla por un defecto o por cómo la instalamos (por ejemplo, una pantalla nueva deja de responder al tacto o una batería nueva no carga), trae el equipo con tu recibo y lo arreglamos sin costo.",
            "La garantía de reparación no cubre:",
            {
              list: [
                "daños físicos nuevos, como caídas, grietas, dobleces o marcas de presión;",
                "contacto con cualquier líquido;",
                "piezas que no cambiamos o fallas que no formaban parte de la reparación;",
                "equipos abiertos o reparados por otra persona después de nuestra reparación;",
                "problemas de software, datos perdidos o bloqueos de compañía o de cuenta.",
              ],
            },
          ],
        },
        {
          id: "liquidos",
          title: "Equipos dañados por líquidos",
          body: [
            "El daño por líquidos se extiende dentro del equipo y puede causar nuevas fallas mucho después de una reparación, por eso las reparaciones de equipos mojados no tienen garantía. Siempre te avisamos antes de empezar si vemos señales de daño por líquidos.",
          ],
        },
        {
          id: "antes",
          title: "Antes de una reparación",
          body: [
            "Haz un respaldo de tus datos antes de cualquier reparación; no nos hacemos responsables de datos perdidos durante la reparación. Te damos el precio antes de empezar y solo hacemos el trabajo que apruebes. Abrir un celular puede reducir su resistencia al agua, y una reparación en un taller independiente puede afectar la garantía restante del fabricante.",
          ],
        },
        {
          id: "aviso",
          title: "Aviso legal",
          body: [
            "SALVO LA GARANTÍA DE REPARACIÓN DESCRITA ARRIBA Y CUALQUIER GARANTÍA DEL FABRICANTE, Y EN LA MEDIDA EN QUE LA LEY LO PERMITA, TIC WIRELESS NO OTORGA NINGUNA OTRA GARANTÍA, EXPRESA O IMPLÍCITA, INCLUIDA CUALQUIER GARANTÍA IMPLÍCITA DE COMERCIABILIDAD O DE IDONEIDAD PARA UN FIN DETERMINADO. LOS EQUIPOS USADOS SE VENDEN EN EL ESTADO EN QUE SE ENCUENTRAN.",
            "Esto no limita ningún derecho que tengas según las leyes de Texas o federales que no pueda renunciarse, ni tus derechos según nuestra política de Devoluciones.",
          ],
        },
        contact.es,
      ],
    },
  },

  // ---------------------------------------------------------------- shipping
  shipping: {
    en: {
      summary:
        "We ship online orders within the continental United States, or you can pick up free at our Hillcroft store in Houston. Rates and delivery options are shown at checkout.",
      points: [
        "We ship to the 48 contiguous states and Washington, D.C.",
        "Free store pickup at 3640 Hillcroft St, Suite C, Houston. Bring your order number and a photo ID.",
        "Orders usually leave within 1–2 business days, with tracking.",
        "Shipping costs and delivery options are shown at checkout before you pay.",
      ],
      sections: [
        {
          id: "where",
          title: "Where we ship",
          body: [
            "We ship within the 48 contiguous United States and Washington, D.C. We don't currently ship to Alaska, Hawaii, US territories, APO/FPO addresses or other countries. For security, we don't ship phones, tablets, laptops or consoles to P.O. boxes or freight forwarders.",
          ],
        },
        {
          id: "pickup",
          title: "Free store pickup",
          body: [
            `Choose pickup at checkout to collect your order at ${ADDRESS}. We'll let you know when it's ready, usually the same day during store hours. Bring your order number and a valid photo ID in the name on the order. If someone else is picking up, call us first.`,
            "We hold pickup orders for 7 days. If an order isn't picked up by then, we'll contact you, and we may cancel it and refund your payment.",
          ],
        },
        {
          id: "processing",
          title: "Processing time",
          body: [
            "Orders usually ship within 1–2 business days (Monday to Friday, excluding holidays). Orders placed in the evening, on weekends or on holidays start processing the next business day. If an item turns out to be unavailable, we'll contact you right away and offer another option or a full refund.",
          ],
        },
        {
          id: "rates",
          title: "Shipping rates and delivery times",
          body: [
            "Available shipping methods, their costs and estimated delivery times are calculated and shown at checkout before you pay. Delivery estimates come from the carrier and start when the order ships.",
          ],
        },
        {
          id: "verification",
          title: "Order verification and signatures",
          body: [
            "To protect you from fraud, we may ask you to verify your identity or payment before shipping a high-value item such as a phone or laptop. If we can't verify an order, we'll cancel it and refund your payment in full. Phones, tablets, laptops and consoles may require a signature on delivery.",
          ],
        },
        {
          id: "tracking",
          title: "Tracking",
          body: [
            "When your order ships, you'll get an email with the carrier and tracking number. If tracking hasn't updated within 2 business days of shipping, call us and we'll look into it.",
          ],
        },
        {
          id: "problems",
          title: "Lost, late or damaged packages",
          body: [
            "If a package arrives damaged, take photos of the box and the item, and contact us within 2 days of delivery. Keep all the packaging. If tracking shows a package as delivered but you haven't received it, check with neighbors and your building's mail area, then contact us within 7 days. We'll file a claim with the carrier and work with you on a replacement or refund.",
            "Please double-check your shipping address at checkout. We can't redirect a package once it has shipped, and we aren't responsible for delays or losses caused by an incorrect address.",
          ],
        },
        {
          id: "taxes",
          title: "Sales tax",
          body: [
            "Sales tax is calculated at checkout based on the delivery or pickup address, as required by law.",
          ],
        },
        {
          id: "unlocked",
          title: "Unlocked phones",
          body: [
            "Phones are sold unlocked. Whether a phone works with your carrier depends on the carrier's network and activation rules. If you're not sure, call us before you order and we'll check the exact model for you.",
          ],
        },
        contact.en,
      ],
    },
    es: {
      summary:
        "Enviamos pedidos en línea dentro de los Estados Unidos continentales, o puedes recogerlos gratis en nuestra tienda de Hillcroft en Houston. Las tarifas y opciones de entrega aparecen al pagar.",
      points: [
        "Enviamos a los 48 estados contiguos y a Washington, D.C.",
        "Recogida gratis en 3640 Hillcroft St, Suite C, Houston. Trae tu número de pedido y una identificación con foto.",
        "Los pedidos normalmente salen en 1 a 2 días hábiles, con número de rastreo.",
        "El costo de envío y las opciones de entrega aparecen al pagar, antes de confirmar.",
      ],
      sections: [
        {
          id: "destinos",
          title: "A dónde enviamos",
          body: [
            "Enviamos dentro de los 48 estados contiguos de EE. UU. y Washington, D.C. Por ahora no enviamos a Alaska, Hawái, territorios de EE. UU., direcciones APO/FPO ni a otros países. Por seguridad, no enviamos celulares, tabletas, laptops ni consolas a apartados postales (P.O. box) ni a reexpedidores.",
          ],
        },
        {
          id: "recogida",
          title: "Recogida gratis en la tienda",
          body: [
            `Elige recoger en la tienda al pagar para recibir tu pedido en ${ADDRESS}. Te avisamos cuando esté listo, normalmente el mismo día en horario de la tienda. Trae tu número de pedido y una identificación oficial con foto a nombre de quien hizo el pedido. Si otra persona lo va a recoger, llámanos antes.`,
            "Guardamos los pedidos para recoger durante 7 días. Si no se recogen en ese tiempo, te contactamos y podemos cancelarlo y reembolsar tu pago.",
          ],
        },
        {
          id: "preparacion",
          title: "Tiempo de preparación",
          body: [
            "Los pedidos normalmente se envían en 1 a 2 días hábiles (lunes a viernes, sin contar días festivos). Los pedidos hechos en la noche, en fin de semana o en día festivo empiezan a prepararse el siguiente día hábil. Si un artículo no está disponible, te contactamos de inmediato y te ofrecemos otra opción o el reembolso completo.",
          ],
        },
        {
          id: "tarifas",
          title: "Tarifas y tiempos de entrega",
          body: [
            "Los métodos de envío disponibles, su costo y el tiempo estimado de entrega se calculan y aparecen al pagar, antes de confirmar. Los tiempos de entrega los da la paquetería y cuentan desde que sale el pedido.",
          ],
        },
        {
          id: "verificacion",
          title: "Verificación del pedido y firma",
          body: [
            "Para protegerte contra fraudes, podemos pedirte que verifiques tu identidad o tu pago antes de enviar un artículo de alto valor, como un celular o una laptop. Si no podemos verificar un pedido, lo cancelamos y te reembolsamos todo. Los celulares, tabletas, laptops y consolas pueden requerir firma al entregarse.",
          ],
        },
        {
          id: "rastreo",
          title: "Rastreo",
          body: [
            "Cuando tu pedido salga, recibirás un correo con la paquetería y el número de rastreo. Si el rastreo no se actualiza dentro de 2 días hábiles después del envío, llámanos y lo revisamos.",
          ],
        },
        {
          id: "problemas",
          title: "Paquetes perdidos, atrasados o dañados",
          body: [
            "Si un paquete llega dañado, toma fotos de la caja y del artículo y contáctanos dentro de 2 días después de la entrega. Guarda todo el empaque. Si el rastreo dice entregado pero no lo recibiste, pregunta a tus vecinos y en el área de correo de tu edificio, y luego contáctanos dentro de 7 días. Presentamos un reclamo con la paquetería y te ayudamos con un reemplazo o un reembolso.",
            "Revisa bien tu dirección de envío al pagar. No podemos cambiar el destino de un paquete que ya salió, y no nos hacemos responsables de retrasos o pérdidas por una dirección incorrecta.",
          ],
        },
        {
          id: "impuestos",
          title: "Impuesto sobre la venta",
          body: [
            "El impuesto sobre la venta se calcula al pagar según la dirección de entrega o de recogida, como lo exige la ley.",
          ],
        },
        {
          id: "desbloqueados",
          title: "Celulares desbloqueados",
          body: [
            "Los celulares se venden desbloqueados. Que un celular funcione con tu compañía depende de su red y de sus reglas de activación. Si tienes dudas, llámanos antes de comprar y revisamos el modelo exacto.",
          ],
        },
        contact.es,
      ],
    },
  },

  // ---------------------------------------------------------------- privacy
  privacy: {
    en: {
      summary:
        "How TIC Wireless collects, uses and protects your information in our Houston store, on www.ticwirelesstx.com, in our online shop and in live chat. We don't sell your personal information.",
      points: [
        "We collect what we need to sell, repair, activate and support your devices, and to run this website.",
        "Payments are handled by Shopify's secure checkout; we never see your full card number.",
        "We use Google Analytics, Hotjar and our own visit counter to understand how the site is used.",
        "We don't sell your personal information. You can ask to see, correct or delete it at any time.",
      ],
      sections: [
        {
          id: "who",
          title: "Who we are",
          body: [
            `${STORE} ("TIC Wireless", "we") is an independent cell phone and electronics store at ${ADDRESS}. This policy covers our store, our website ${SITE} (including its Spanish and other-language pages), our online shop, our phone line and our live chat.`,
          ],
        },
        {
          id: "collect",
          title: "Information we collect",
          body: [
            "Information you give us:",
            {
              list: [
                "Contact details, such as your name, phone number, email and address, when you place an order, create an account, drop off a repair, chat with us or call.",
                "Order details: what you bought, how you paid and where it ships. Payments go through Shopify's checkout and its payment processors; we see only the payment type and the last digits of your card.",
                "Device details, such as the model, serial number or IMEI, when we repair, activate, unlock or buy a device.",
                "Carrier details, such as the phone number and account information needed to activate a plan, port a number, pay a bill or send a recharge. We use them only for that service.",
                "Photo ID details, when the law or the transaction requires it: for example, when you sell or trade in a device, pick up an order, or return a purchase.",
                "Messages you send us in live chat, by phone or in person.",
              ],
            },
            "Information collected automatically when you use our website:",
            {
              list: [
                "Pages you visit, the site that referred you, your browser and device type, language, approximate location based on your IP address, and how you interact with pages. This comes from Google Analytics and Hotjar, which use cookies and similar technologies. Hotjar may record clicks, scrolling and mouse movement, and hides what you type in forms.",
                "Our own simple visit counter, which records the page, language, referring site, whether you're on a phone or computer, and a random session number. It doesn't record your name, email or IP address.",
                "Settings saved in your browser: your cart, language, currency and display theme.",
              ],
            },
            "Our store uses security cameras for the safety of customers and staff.",
          ],
        },
        {
          id: "use",
          title: "How we use it",
          body: [
            {
              list: [
                "To sell, ship, and arrange pickup of your orders, and to process returns and refunds.",
                "To repair, activate, unlock and set up devices, and to provide prepaid plans, bill payments and international recharges.",
                "To help you apply for lease-to-own or payment plans with our partners.",
                "To answer your questions and give you updates about your order or repair.",
                "To prevent fraud, verify identity and ownership, and keep our store secure.",
                "To understand how people use our website and improve it.",
                "To send you offers by email, only if you've agreed to receive them. You can unsubscribe at any time.",
                "To meet legal, tax and accounting requirements.",
              ],
            },
          ],
        },
        {
          id: "share",
          title: "Who we share it with",
          body: [
            "We share information only as needed to provide our services:",
            {
              list: [
                "Shopify, which runs our online checkout, orders and payments. Shop Pay Installments are provided by Affirm.",
                `Lease-to-own partners: ${PORTALS}. When you apply, you do so on their secure website, and their privacy policies apply. They may tell us whether you're approved and what you lease.`,
                "Wireless carriers and payment networks, to activate service, port numbers, pay bills and send recharges you ask for.",
                "Service providers that help us run the business: Google Analytics and Hotjar (website analytics), Tidio (live chat, which may answer first with an automated assistant), our website host and database provider, and shipping carriers.",
                "Law enforcement or government agencies, when the law requires it or to report a lost or stolen device.",
                "A buyer or successor, if our business is sold or reorganized.",
              ],
            },
            "We don't sell your personal information, and we don't share it for others to market to you.",
          ],
        },
        {
          id: "cookies",
          title: "Cookies and your choices",
          body: [
            "Cookies and browser storage keep your cart and settings working, and let Google Analytics and Hotjar measure how the site is used. You can block or delete cookies in your browser settings; the shop's cart may not work without them. You can also opt out of Google Analytics with Google's browser add-on (tools.google.com/dlpage/gaoptout), and opt out of Hotjar at hotjar.com/policies/do-not-track.",
          ],
        },
        {
          id: "keep",
          title: "How long we keep it",
          body: [
            "We keep information only as long as we need it for the purpose we collected it, or as long as the law requires. For example, we keep order and sales records for tax and accounting purposes, and repair records while your repair warranty applies.",
          ],
        },
        {
          id: "security",
          title: "How we protect it",
          body: [
            "Our website uses encrypted connections (HTTPS), payments are processed by Shopify's PCI-compliant checkout, and only authorized staff can access customer records. No method of storage or transmission is completely secure, but we work to protect your information and limit who can see it.",
            "When we work on your device, we only access what the job requires. Please back up and, where possible, sign out of your accounts before a repair or trade-in.",
          ],
        },
        {
          id: "rights",
          title: "Your rights",
          body: [
            "You can ask us to:",
            {
              list: [
                "tell you what personal information we have about you, and give you a copy;",
                "correct information that's wrong;",
                "delete your information, unless we need to keep it by law or to complete a transaction;",
                "stop sending you marketing messages;",
                "not use your information for targeted advertising, sale or profiling.",
              ],
            },
            "Texas residents have these rights under the Texas Data Privacy and Security Act. We'll answer your request within 45 days, and we may need to confirm your identity first. If we decline your request, you can ask us to reconsider by contacting us again; if you're still unsatisfied, you can contact the Texas Attorney General.",
            `To make a request, call ${PHONE} or visit us at the store. We won't treat you differently for using these rights.`,
          ],
        },
        {
          id: "children",
          title: "Children",
          body: [
            "Our website and online shop are not intended for children under 13, and we don't knowingly collect information from them. You must be 18 or older to place an order online or apply for lease-to-own.",
          ],
        },
        {
          id: "links",
          title: "Other websites",
          body: [
            "Our site links to other websites, such as leasing applications, carriers, Google Maps and social media. Their own privacy policies apply when you use them.",
          ],
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: [
            "We may update this policy when our services or the law change. The date at the top shows when it last changed.",
          ],
        },
        contact.en,
      ],
    },
    es: {
      summary:
        "Cómo TIC Wireless recopila, usa y protege tu información en nuestra tienda de Houston, en www.ticwirelesstx.com, en la tienda en línea y en el chat. No vendemos tu información personal.",
      points: [
        "Recopilamos lo necesario para vender, reparar, activar y dar soporte a tus equipos, y para operar este sitio web.",
        "Los pagos se procesan en el pago seguro de Shopify; nunca vemos el número completo de tu tarjeta.",
        "Usamos Google Analytics, Hotjar y nuestro propio contador de visitas para entender cómo se usa el sitio.",
        "No vendemos tu información personal. Puedes pedir verla, corregirla o borrarla en cualquier momento.",
      ],
      sections: [
        {
          id: "quienes",
          title: "Quiénes somos",
          body: [
            `${STORE} ("TIC Wireless", "nosotros") es una tienda independiente de celulares y electrónica en ${ADDRESS}. Esta política cubre nuestra tienda, nuestro sitio web ${SITE} (incluidas sus páginas en español y en otros idiomas), la tienda en línea, nuestra línea telefónica y el chat.`,
          ],
        },
        {
          id: "recopilamos",
          title: "Información que recopilamos",
          body: [
            "Información que nos das:",
            {
              list: [
                "Datos de contacto, como nombre, teléfono, correo y dirección, cuando haces un pedido, creas una cuenta, dejas una reparación, nos escribes en el chat o nos llamas.",
                "Datos del pedido: qué compraste, cómo pagaste y a dónde se envía. Los pagos se hacen en el pago de Shopify y sus procesadores; solo vemos el tipo de pago y los últimos dígitos de tu tarjeta.",
                "Datos del equipo, como el modelo, número de serie o IMEI, cuando reparamos, activamos, liberamos o compramos un equipo.",
                "Datos de tu compañía telefónica, como el número y la información de cuenta necesaria para activar un plan, portar un número, pagar una factura o enviar una recarga. Los usamos solo para ese servicio.",
                "Datos de tu identificación con foto, cuando la ley o la operación lo requieren: por ejemplo, cuando vendes o intercambias un equipo, recoges un pedido o devuelves una compra.",
                "Los mensajes que nos envías en el chat, por teléfono o en persona.",
              ],
            },
            "Información que se recopila automáticamente cuando usas nuestro sitio:",
            {
              list: [
                "Las páginas que visitas, el sitio que te refirió, tu navegador y tipo de dispositivo, idioma, ubicación aproximada según tu dirección IP y cómo interactúas con las páginas. Esto lo recopilan Google Analytics y Hotjar con cookies y tecnologías similares. Hotjar puede registrar clics, desplazamiento y movimiento del mouse, y oculta lo que escribes en los formularios.",
                "Nuestro propio contador de visitas, que registra la página, el idioma, el sitio de referencia, si usas celular o computadora y un número de sesión aleatorio. No registra tu nombre, correo ni dirección IP.",
                "Ajustes guardados en tu navegador: tu carrito, idioma, moneda y tema de pantalla.",
              ],
            },
            "Nuestra tienda usa cámaras de seguridad para proteger a clientes y empleados.",
          ],
        },
        {
          id: "uso",
          title: "Cómo la usamos",
          body: [
            {
              list: [
                "Para vender, enviar y preparar la recogida de tus pedidos, y para procesar devoluciones y reembolsos.",
                "Para reparar, activar, liberar y configurar equipos, y para ofrecer planes prepagados, pagos de factura y recargas internacionales.",
                "Para ayudarte a solicitar arrendamiento con opción a compra o planes de pago con nuestros socios.",
                "Para responder tus preguntas y avisarte sobre tu pedido o reparación.",
                "Para prevenir fraudes, verificar identidad y propiedad, y mantener segura nuestra tienda.",
                "Para entender cómo se usa nuestro sitio y mejorarlo.",
                "Para enviarte ofertas por correo, solo si aceptaste recibirlas. Puedes darte de baja cuando quieras.",
                "Para cumplir requisitos legales, fiscales y contables.",
              ],
            },
          ],
        },
        {
          id: "compartimos",
          title: "Con quién la compartimos",
          body: [
            "Compartimos información solo cuando es necesario para darte nuestros servicios:",
            {
              list: [
                "Shopify, que opera nuestro pago en línea, pedidos y cobros. Shop Pay Installments lo ofrece Affirm.",
                `Socios de arrendamiento con opción a compra: ${PORTALS}. Cuando solicitas, lo haces en su sitio seguro y aplican sus políticas de privacidad. Pueden informarnos si te aprobaron y qué equipo arriendas.`,
                "Compañías telefónicas y redes de pago, para activar servicio, portar números, pagar facturas y enviar las recargas que pidas.",
                "Proveedores que nos ayudan a operar: Google Analytics y Hotjar (estadísticas del sitio), Tidio (chat en vivo, que puede responder primero con un asistente automático), nuestro proveedor de hospedaje y base de datos, y paqueterías.",
                "Autoridades o dependencias de gobierno, cuando la ley lo exige o para reportar un equipo perdido o robado.",
                "Un comprador o sucesor, si nuestro negocio se vende o se reorganiza.",
              ],
            },
            "No vendemos tu información personal ni la compartimos para que otros te ofrezcan sus productos.",
          ],
        },
        {
          id: "cookies",
          title: "Cookies y tus opciones",
          body: [
            "Las cookies y el almacenamiento del navegador mantienen funcionando tu carrito y tus ajustes, y permiten que Google Analytics y Hotjar midan cómo se usa el sitio. Puedes bloquear o borrar cookies en la configuración de tu navegador; el carrito podría no funcionar sin ellas. También puedes excluirte de Google Analytics con el complemento de Google (tools.google.com/dlpage/gaoptout) y de Hotjar en hotjar.com/policies/do-not-track.",
          ],
        },
        {
          id: "conservamos",
          title: "Cuánto tiempo la conservamos",
          body: [
            "Conservamos la información solo mientras la necesitamos para el fin con que la recopilamos, o el tiempo que exija la ley. Por ejemplo, guardamos registros de pedidos y ventas por motivos fiscales y contables, y los registros de reparación mientras aplique su garantía.",
          ],
        },
        {
          id: "seguridad",
          title: "Cómo la protegemos",
          body: [
            "Nuestro sitio usa conexiones cifradas (HTTPS), los pagos se procesan en el pago de Shopify, que cumple con PCI, y solo personal autorizado puede ver los registros de clientes. Ningún método de almacenamiento o transmisión es completamente seguro, pero trabajamos para proteger tu información y limitar quién puede verla.",
            "Cuando trabajamos en tu equipo, solo accedemos a lo que el trabajo requiere. Haz un respaldo y, si puedes, cierra tus cuentas antes de una reparación o intercambio.",
          ],
        },
        {
          id: "derechos",
          title: "Tus derechos",
          body: [
            "Puedes pedirnos:",
            {
              list: [
                "que te digamos qué información personal tenemos de ti y te demos una copia;",
                "que corrijamos información equivocada;",
                "que borremos tu información, salvo que debamos conservarla por ley o para completar una operación;",
                "que dejemos de enviarte mensajes de mercadotecnia;",
                "que no usemos tu información para publicidad dirigida, venta o elaboración de perfiles.",
              ],
            },
            "Los residentes de Texas tienen estos derechos según la Ley de Privacidad y Seguridad de Datos de Texas (Texas Data Privacy and Security Act). Respondemos tu solicitud dentro de 45 días y podemos pedirte que confirmes tu identidad primero. Si rechazamos tu solicitud, puedes pedirnos que la reconsideremos contactándonos de nuevo; si sigues inconforme, puedes comunicarte con la Procuraduría General de Texas.",
            `Para hacer una solicitud, llama al ${PHONE} o visítanos en la tienda. No te trataremos de forma distinta por usar estos derechos.`,
          ],
        },
        {
          id: "menores",
          title: "Menores de edad",
          body: [
            "Nuestro sitio y la tienda en línea no están dirigidos a menores de 13 años, y no recopilamos su información a sabiendas. Debes tener 18 años o más para hacer un pedido en línea o solicitar arrendamiento con opción a compra.",
          ],
        },
        {
          id: "otros-sitios",
          title: "Otros sitios web",
          body: [
            "Nuestro sitio tiene enlaces a otros sitios, como solicitudes de arrendamiento, compañías telefónicas, Google Maps y redes sociales. Cuando los usas, aplican sus propias políticas de privacidad.",
          ],
        },
        {
          id: "cambios",
          title: "Cambios a esta política",
          body: [
            "Podemos actualizar esta política cuando cambien nuestros servicios o la ley. La fecha de arriba muestra cuándo cambió por última vez.",
          ],
        },
        contact.es,
      ],
    },
  },

  // ---------------------------------------------------------------- terms
  terms: {
    en: {
      summary:
        "The terms for buying from TIC Wireless and using www.ticwirelesstx.com: orders, prices, payment and lease-to-own options, unlocked phones, repairs, trade-ins and prepaid services.",
      points: [
        "Prices are in US dollars; currency conversions on the site are estimates only.",
        "Lease-to-own is provided by our leasing partners, is not a loan, and is subject to their approval and agreement.",
        "Phones are sold unlocked; carrier compatibility depends on your carrier.",
        "Prepaid plans, bill payments and recharges are final once processed.",
      ],
      sections: [
        {
          id: "agreement",
          title: "About these terms",
          body: [
            `These terms apply when you use ${SITE}, shop online, or buy products and services from ${STORE} ("TIC Wireless", "we"). By using the site or placing an order, you agree to them, along with our Returns, Warranty, Shipping and Privacy policies.`,
          ],
        },
        {
          id: "products",
          title: "Products and descriptions",
          body: [
            "We sell new and pre-owned devices. Each listing or our staff will tell you a device's condition. Specifications on our device pages are the manufacturer's US launch specifications; the unit you buy may differ in storage, color or condition, so please confirm before buying. Photos may show a representative unit rather than the exact item.",
            "In-store stock changes quickly. Online orders are subject to availability, and if an item you ordered isn't available, we'll offer an alternative or a full refund.",
          ],
        },
        {
          id: "prices",
          title: "Prices",
          body: [
            "Prices are in US dollars and can change without notice. The currency selector on our website shows approximate conversions for your convenience; you are always charged in US dollars, and your bank may apply its own exchange rate and fees.",
            "Despite our best efforts, a price or description may occasionally be wrong. If it is, we may cancel the order and refund you in full, even after you've received a confirmation, or contact you with the correct price before we proceed.",
          ],
        },
        {
          id: "orders",
          title: "Orders and payment",
          body: [
            "Online orders are paid through Shopify's secure checkout. An order is accepted when we ship it or mark it ready for pickup. We may limit quantities, ask to verify your identity or payment, or decline or cancel an order to prevent fraud; if we cancel, we refund you in full. You must be 18 or older to place an order online.",
          ],
        },
        {
          id: "payment-plans",
          title: "Payment plans and lease-to-own",
          body: [
            "Shop Pay Installments is offered by Affirm at checkout, subject to eligibility. Affirm sets the terms, and your agreement is with Affirm.",
            `Lease-to-own is offered by ${PORTALS}. It is a lease, not a loan or credit. Approval isn't guaranteed and is decided by the leasing company. The leasing company owns the device until the lease is paid off or bought out, and your lease agreement with them sets the payments, fees, ownership and early buyout terms. The total cost of leasing to own is more than the cash price. TIC Wireless is the retailer and isn't the lessor. Down payments shown on our site (such as "as low as $40 down") are starting points; your actual terms depend on the item and the plan you're approved for.`,
          ],
        },
        {
          id: "unlocked",
          title: "Unlocked phones and carriers",
          body: [
            "Our phones are sold unlocked. Whether a phone works with a particular carrier depends on that carrier's network technology and activation rules, which can change. We're happy to check compatibility for you before you buy, but we can't guarantee any carrier's service, coverage or activation decisions.",
          ],
        },
        {
          id: "repairs",
          title: "Repairs",
          body: [
            "We give you a price before starting, and we only do the work you approve. If we find more damage once we open the device, we'll ask you before doing anything more. Please back up your data before a repair; we aren't responsible for data loss. Repairs are covered by our Warranty policy.",
            "We'll contact you when your device is ready. Please pick it up within 30 days. Devices left longer may be treated as abandoned property as permitted by Texas law, after we've tried to contact you.",
          ],
        },
        {
          id: "services",
          title: "Unlocking, activation and prepaid services",
          body: [
            "Unlocking depends on the device and on the original carrier's eligibility rules. Devices reported lost or stolen, or with an unpaid balance on a carrier's financing plan, usually can't be unlocked. We'll tell you whether your device is eligible before we start.",
            "Prepaid plans, phone bill payments and international recharges are processed with the carrier or provider you choose. Please check the phone number and amount carefully; once a transaction has been processed, it can't be cancelled or refunded. The carrier's own terms apply to your plan and service.",
          ],
        },
        {
          id: "trade-ins",
          title: "Selling and trading in devices",
          body: [
            "When you sell or trade in a device, you confirm that you own it, that it isn't lost, stolen, financed or blocked, and that you have the right to sell it. We'll ask for a valid photo ID and record it as the law requires. Remove your accounts (Apple ID, Google, Samsung) and erase your data before handing the device over. Trade-in values depend on our inspection and may change if the device's condition differs from what you described. We cooperate with law enforcement on reports of stolen devices.",
          ],
        },
        {
          id: "accounts",
          title: "Accounts",
          body: [
            "If you create an account on our website, keep your password private and tell us if you think someone else has used your account. We may close accounts that are used to misuse the site.",
          ],
        },
        {
          id: "use",
          title: "Using our website",
          body: [
            "Please don't misuse the site: don't attempt to access other people's accounts or our systems, interfere with how the site works, place fraudulent orders, or copy the site for commercial use.",
          ],
        },
        {
          id: "ip",
          title: "Trademarks and content",
          body: [
            "The text, design and photos of our store on this website belong to TIC Wireless. Some product photos are used under Creative Commons licenses and credited to their authors on each page.",
            "Apple, iPhone and iPad are trademarks of Apple Inc. Samsung and Galaxy are trademarks of Samsung Electronics Co., Ltd. Other product names are trademarks of their owners. TIC Wireless is an independent retailer and repair shop, and is not affiliated with, sponsored by or an authorized service provider of Apple, Samsung or any carrier unless we say so.",
          ],
        },
        {
          id: "third-party",
          title: "Other companies' websites and services",
          body: [
            "Our site links to services run by other companies, including our leasing partners, Shopify, Affirm, carriers and Google Maps. We aren't responsible for their content or practices, and their own terms apply when you use them.",
          ],
        },
        {
          id: "liability",
          title: "Limits on our liability",
          body: [
            "We work hard to keep the website accurate and available, but we provide it as is and can't promise it will always be error-free or uninterrupted. To the fullest extent allowed by law, TIC Wireless isn't liable for indirect, incidental or consequential damages, such as lost data or lost profits, arising from your use of the website or our products and services, and our total liability for any claim is limited to the amount you paid for the product or service involved.",
            "Nothing in these terms limits any right you have under the Texas Deceptive Trade Practices–Consumer Protection Act or other law that can't be waived.",
          ],
        },
        {
          id: "law",
          title: "Governing law",
          body: [
            "These terms are governed by the laws of the State of Texas. Any dispute will be handled in the state or federal courts located in Harris County, Texas, unless the law gives you the right to bring it somewhere else. Before going to court, please call us; most problems can be solved at the counter.",
          ],
        },
        {
          id: "changes",
          title: "Changes to these terms",
          body: [
            "We may update these terms from time to time. The version on this page when you place an order or use a service is the one that applies.",
          ],
        },
        contact.en,
      ],
    },
    es: {
      summary:
        "Los términos para comprar en TIC Wireless y usar www.ticwirelesstx.com: pedidos, precios, formas de pago y arrendamiento, celulares desbloqueados, reparaciones, intercambios y servicios prepagados.",
      points: [
        "Los precios están en dólares estadounidenses; las conversiones de moneda del sitio son solo aproximadas.",
        "El arrendamiento con opción a compra lo ofrecen nuestros socios, no es un préstamo y está sujeto a su aprobación y contrato.",
        "Los celulares se venden desbloqueados; la compatibilidad depende de tu compañía.",
        "Los planes prepagados, pagos de factura y recargas son definitivos una vez procesados.",
      ],
      sections: [
        {
          id: "acuerdo",
          title: "Sobre estos términos",
          body: [
            `Estos términos aplican cuando usas ${SITE}, compras en línea o adquieres productos y servicios de ${STORE} ("TIC Wireless", "nosotros"). Al usar el sitio o hacer un pedido, los aceptas, junto con nuestras políticas de Devoluciones, Garantía, Envíos y Privacidad.`,
          ],
        },
        {
          id: "productos",
          title: "Productos y descripciones",
          body: [
            "Vendemos equipos nuevos y usados. Cada anuncio o nuestro personal te dirá el estado del equipo. Las especificaciones en nuestras páginas de equipos son las del fabricante para el modelo de EE. UU. en su lanzamiento; la unidad que compres puede variar en capacidad, color o estado, así que confírmalo antes de comprar. Las fotos pueden mostrar una unidad representativa y no el artículo exacto.",
            "El inventario de la tienda cambia rápido. Los pedidos en línea están sujetos a disponibilidad y, si un artículo que pediste no está disponible, te ofrecemos otra opción o el reembolso completo.",
          ],
        },
        {
          id: "precios",
          title: "Precios",
          body: [
            "Los precios están en dólares estadounidenses y pueden cambiar sin aviso. El selector de moneda de nuestro sitio muestra conversiones aproximadas para tu comodidad; siempre se te cobra en dólares estadounidenses, y tu banco puede aplicar su propio tipo de cambio y comisiones.",
            "A pesar de nuestro esfuerzo, un precio o una descripción pueden estar equivocados. Si eso pasa, podemos cancelar el pedido y reembolsarte todo, aunque ya hayas recibido una confirmación, o contactarte con el precio correcto antes de continuar.",
          ],
        },
        {
          id: "pedidos",
          title: "Pedidos y pago",
          body: [
            "Los pedidos en línea se pagan en el pago seguro de Shopify. Un pedido se acepta cuando lo enviamos o lo marcamos listo para recoger. Podemos limitar cantidades, pedirte que verifiques tu identidad o tu pago, o rechazar o cancelar un pedido para prevenir fraudes; si lo cancelamos, te reembolsamos todo. Debes tener 18 años o más para hacer un pedido en línea.",
          ],
        },
        {
          id: "planes",
          title: "Planes de pago y arrendamiento con opción a compra",
          body: [
            "Shop Pay Installments lo ofrece Affirm al pagar, sujeto a elegibilidad. Affirm fija las condiciones, y tu contrato es con Affirm.",
            `El arrendamiento con opción a compra lo ofrecen ${PORTALS}. Es un arrendamiento, no un préstamo ni un crédito. La aprobación no está garantizada y la decide la compañía de arrendamiento. La compañía es dueña del equipo hasta que el arrendamiento se termine de pagar o se liquide, y tu contrato con ella fija los pagos, cargos, propiedad y opciones de compra anticipada. El costo total de arrendar para comprar es mayor que el precio de contado. TIC Wireless es el vendedor y no es el arrendador. Los enganches que mostramos (como "desde $40 de enganche") son puntos de partida; tus condiciones reales dependen del artículo y del plan que te aprueben.`,
          ],
        },
        {
          id: "desbloqueados",
          title: "Celulares desbloqueados y compañías",
          body: [
            "Nuestros celulares se venden desbloqueados. Que un celular funcione con una compañía depende de la tecnología de su red y de sus reglas de activación, que pueden cambiar. Con gusto revisamos la compatibilidad antes de que compres, pero no podemos garantizar el servicio, la cobertura ni las decisiones de activación de ninguna compañía.",
          ],
        },
        {
          id: "reparaciones",
          title: "Reparaciones",
          body: [
            "Te damos el precio antes de empezar y solo hacemos el trabajo que apruebes. Si al abrir el equipo encontramos más daños, te preguntamos antes de hacer algo más. Haz un respaldo de tus datos antes de una reparación; no nos hacemos responsables de datos perdidos. Las reparaciones están cubiertas por nuestra política de Garantía.",
            "Te avisamos cuando tu equipo esté listo. Recógelo dentro de 30 días. Los equipos que se dejen más tiempo pueden considerarse bienes abandonados según lo permita la ley de Texas, después de intentar comunicarnos contigo.",
          ],
        },
        {
          id: "servicios",
          title: "Liberación, activación y servicios prepagados",
          body: [
            "La liberación depende del equipo y de las reglas de elegibilidad de la compañía original. Los equipos reportados como perdidos o robados, o con saldo pendiente en un plan de financiamiento de la compañía, normalmente no se pueden liberar. Te decimos si tu equipo califica antes de empezar.",
            "Los planes prepagados, pagos de factura y recargas internacionales se procesan con la compañía o el proveedor que elijas. Revisa bien el número y el monto; una vez procesada, la operación no se puede cancelar ni reembolsar. Las condiciones de la compañía aplican a tu plan y servicio.",
          ],
        },
        {
          id: "intercambios",
          title: "Venta e intercambio de equipos",
          body: [
            "Cuando vendes o intercambias un equipo, confirmas que es tuyo, que no está perdido, robado, financiado ni bloqueado, y que tienes derecho a venderlo. Te pediremos una identificación oficial con foto y la registraremos como lo exige la ley. Quita tus cuentas (Apple ID, Google, Samsung) y borra tus datos antes de entregar el equipo. El valor del intercambio depende de nuestra revisión y puede cambiar si el estado del equipo es distinto al que describiste. Cooperamos con las autoridades en reportes de equipos robados.",
          ],
        },
        {
          id: "cuentas",
          title: "Cuentas",
          body: [
            "Si creas una cuenta en nuestro sitio, mantén tu contraseña en privado y avísanos si crees que alguien más la usó. Podemos cerrar cuentas que se usen para hacer mal uso del sitio.",
          ],
        },
        {
          id: "uso",
          title: "Uso de nuestro sitio",
          body: [
            "No hagas mal uso del sitio: no intentes entrar a cuentas ajenas ni a nuestros sistemas, no interfieras con su funcionamiento, no hagas pedidos fraudulentos y no copies el sitio para uso comercial.",
          ],
        },
        {
          id: "marcas",
          title: "Marcas y contenido",
          body: [
            "Los textos, el diseño y las fotos de nuestra tienda en este sitio pertenecen a TIC Wireless. Algunas fotos de productos se usan con licencias Creative Commons y se da crédito a sus autores en cada página.",
            "Apple, iPhone y iPad son marcas de Apple Inc. Samsung y Galaxy son marcas de Samsung Electronics Co., Ltd. Otros nombres de productos son marcas de sus dueños. TIC Wireless es una tienda y taller de reparación independiente, y no está afiliada, patrocinada ni es proveedor de servicio autorizado de Apple, Samsung ni de ninguna compañía telefónica, salvo que lo indiquemos.",
          ],
        },
        {
          id: "terceros",
          title: "Sitios y servicios de otras empresas",
          body: [
            "Nuestro sitio tiene enlaces a servicios de otras empresas, como nuestros socios de arrendamiento, Shopify, Affirm, compañías telefónicas y Google Maps. No somos responsables de su contenido ni de sus prácticas, y aplican sus propios términos cuando los usas.",
          ],
        },
        {
          id: "responsabilidad",
          title: "Límites de responsabilidad",
          body: [
            "Trabajamos para mantener el sitio correcto y disponible, pero lo ofrecemos tal cual y no podemos prometer que siempre esté libre de errores o interrupciones. En la medida en que la ley lo permita, TIC Wireless no es responsable de daños indirectos, incidentales o consecuentes, como datos o ganancias perdidas, derivados del uso del sitio o de nuestros productos y servicios, y nuestra responsabilidad total por cualquier reclamo se limita a lo que pagaste por el producto o servicio en cuestión.",
            "Nada en estos términos limita ningún derecho que tengas según la Ley de Prácticas Comerciales Engañosas y Protección al Consumidor de Texas (DTPA) u otra ley que no pueda renunciarse.",
          ],
        },
        {
          id: "ley",
          title: "Ley aplicable",
          body: [
            "Estos términos se rigen por las leyes del estado de Texas. Cualquier controversia se resolverá en los tribunales estatales o federales del condado de Harris, Texas, salvo que la ley te dé derecho a presentarla en otro lugar. Antes de acudir a un tribunal, llámanos; la mayoría de los problemas se resuelven en el mostrador.",
          ],
        },
        {
          id: "cambios",
          title: "Cambios a estos términos",
          body: [
            "Podemos actualizar estos términos de vez en cuando. Aplica la versión de esta página vigente cuando haces un pedido o usas un servicio.",
          ],
        },
        contact.es,
      ],
    },
  },
};
