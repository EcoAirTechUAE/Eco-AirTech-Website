import type { Lang } from "./locale";

/**
 * Interface chrome — navigation, buttons, form labels, states.
 *
 * Deliberately scoped to UI language only. Technical and evidential copy
 * (test protocols, ASHRAE bands, safety figures, mechanism explanations)
 * lives in src/content and is NOT translated here: mistranslating a test
 * condition or a ppm figure is a false claim, not a typo, so that work is
 * reserved for a translator with HVAC/IAQ domain knowledge.
 */
export const ui = {
  en: {
    // Navigation
    "nav.technology": "Technology",
    "nav.devices": "Devices",
    "nav.filters": "Filters",
    "nav.industries": "Industries",
    "nav.results": "Results",
    "nav.contact": "Contact",
    "nav.primary": "Primary",
    "nav.mobile": "Mobile",
    "nav.home": "home",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",

    // Language switcher
    "lang.label": "Language",
    "lang.switchTo": "Switch to Arabic",

    // Calls to action
    "cta.assessment": "Book an air assessment",
    "cta.howItWorks": "See how it works",
    "cta.whatsapp": "WhatsApp",
    "cta.whatsappAria": "Message us on WhatsApp",
    "cta.getInTouch": "Get in touch",
    "cta.learnMore": "Learn more",
    "cta.viewAll": "View all",

    // Contact form
    "form.name": "Your name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.phonePlaceholder": "+971 …",
    "form.organisation": "Company or property",
    "form.interest": "What's the space?",
    "form.message": "Tell us about it",
    "form.messagePlaceholder":
      "Approximate size, type of air conditioning, and anything you've noticed — smell, allergies, visible growth.",
    "form.submit": "Send enquiry",
    "form.sending": "Sending…",
    "form.success": "Thank you — that's with us.",
    "form.successBody": "We'll come back to you shortly.",
    "form.honeypot": "Website",

    // Misc
    "common.skipToContent": "Skip to content",
    "common.backTo": "Back to",
    "common.film": "Film",
  },

  ar: {
    // Navigation
    "nav.technology": "التقنية",
    "nav.devices": "الأجهزة",
    "nav.filters": "الفلاتر",
    "nav.industries": "القطاعات",
    "nav.results": "النتائج",
    "nav.contact": "تواصل معنا",
    "nav.primary": "التنقل الرئيسي",
    "nav.mobile": "قائمة الجوال",
    "nav.home": "الصفحة الرئيسية",
    "nav.openMenu": "فتح القائمة",
    "nav.closeMenu": "إغلاق القائمة",

    // Language switcher
    "lang.label": "اللغة",
    "lang.switchTo": "التبديل إلى الإنجليزية",

    // Calls to action
    "cta.assessment": "احجز تقييماً لجودة الهواء",
    "cta.howItWorks": "كيف تعمل التقنية",
    "cta.whatsapp": "واتساب",
    "cta.whatsappAria": "راسلنا عبر واتساب",
    "cta.getInTouch": "تواصل معنا",
    "cta.learnMore": "اعرف المزيد",
    "cta.viewAll": "عرض الكل",

    // Contact form
    "form.name": "الاسم",
    "form.email": "البريد الإلكتروني",
    "form.phone": "رقم الهاتف",
    "form.phonePlaceholder": "+971 …",
    "form.organisation": "الشركة أو العقار",
    "form.interest": "نوع المكان",
    "form.message": "أخبرنا عن المكان",
    "form.messagePlaceholder":
      "المساحة التقريبية، ونوع نظام التكييف، وأي شيء لاحظته — رائحة، أو حساسية، أو نمو ظاهر.",
    "form.submit": "إرسال الطلب",
    "form.sending": "جارٍ الإرسال…",
    "form.success": "شكراً لك — وصلتنا رسالتك.",
    "form.successBody": "سنعاود التواصل معك قريباً.",
    "form.honeypot": "Website",

    // Misc
    "common.skipToContent": "تخطَّ إلى المحتوى",
    "common.backTo": "العودة إلى",
    "common.film": "فيديو",
  },
} as const;

export type UiKey = keyof (typeof ui)["en"];

/** Falls back to English if a key is missing from a locale. */
export function translate(lang: Lang, key: UiKey): string {
  const table = ui[lang] as Record<string, string>;
  return table[key] ?? ui.en[key];
}
