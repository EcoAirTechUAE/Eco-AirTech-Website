import type { Content, DeepPartial } from "../index";

/**
 * Arabic overlay. Partial by design.
 *
 * Anything absent here falls back to English, so the site is always complete
 * rather than half-blank. That matters because of a deliberate split:
 *
 *   Translated here  — navigation-level marketing copy: section names, the
 *                      positioning line for each sector, product summaries.
 *   NOT translated   — test protocols, ASHRAE bands, ppm figures, mechanism
 *                      explanations, study conditions. Mistranslating a test
 *                      condition or a safety figure is a false claim, not a
 *                      typo, so those wait for a translator with HVAC/IAQ
 *                      domain knowledge.
 *
 * Arrays merge by index, so entries must stay in the same order as the
 * English source. `{}` keeps an entry in English.
 */
export const arOverrides: DeepPartial<Content> = {
  trustHeading: {
    eyebrow: "مثبتة على نطاق واسع",
    headline: "التقنية التي تحظى بثقة واستخدام",
    sub: "في الطيران والرعاية الصحية والقطاع الحكومي والضيافة والتعليم — في دول الخليج، والمملكة المتحدة وأيرلندا، والولايات المتحدة.",
  },

  ambition: {
    eyebrow: "طموحنا",
    statement:
      "أن نصبح الاسم الأكثر ثقة في مجال الهواء النظيف في دول الخليج — نحمي الأرواح ونرتقي بالبيئات في كل منزل ومدرسة ومكتب وفندق ومطار في المنطقة.",
  },

  filterIntro: {
    eyebrow: "النصف السلبي",
    headline: "أذكى فلتر في العالم",
    subhead: "فلتران في واحد — يلتقط الجسيمات والملوثات الغازية معاً.",
  },

  // Order: hvac, portable, 750-plus, ptac, overwatch
  devices: [
    {
      kicker: "داخل مجاري الهواء · المبنى بالكامل",
      summary:
        "نظامنا الرئيسي داخل مجاري الهواء. يُركَّب داخل المجاري القائمة لديك، فيحوّل نظام التكييف الذي ينشر التلوث حالياً إلى الوسيلة التي تزيله.",
    },
    {
      kicker: "قائم بذاته · بدون تركيب",
      summary:
        "النظام بالكامل في وحدة يمكن حملها. بدون تركيب، وبدون مجاري هواء، وبدون التزام — كل ما تحتاجه مقبس كهربائي.",
    },
    {
      kicker: "مثبّت على الجدار · للغرف والمناطق",
      summary:
        "الوحدة الأكثر اختباراً في المجموعة، وصاحبة أقوى نتائجنا في البيئات الحقيقية. صغيرة بما يكفي لتثبيتها في غرفة واحدة، وقوية بما يكفي للتعامل مع غرفة شديدة التلوث.",
    },
    {
      kicker: "تركيب داخلي · مخفي",
      summary:
        "وحدة داخلية مثبّتة بشكل دائم للمساحات التي يصعب الوصول إلى مجاريها. وهي أيضاً إجابتنا الأوضح على أسطح المروحة والملف داخل جهاز التكييف نفسه.",
    },
    {
      kicker: "أحجام كبيرة · صناعي",
      summary:
        "مصمَّم للأحجام الكبيرة. حيث تُقاس المساحة بالأقدام المكعبة لا بمساحة الأرضية — المستودعات وغرف المعدات والصالات الرياضية ومنشآت الأغذية.",
    },
  ],

  // Order: residential, hotels, palaces, healthcare, schools, gyms, hospitality, transportation
  industries: [
    {
      name: "السكني",
      kicker: "الفلل والشقق والمنازل العائلية",
      summary:
        "الهواء داخل المنزل هو الهواء الذي تتنفسه العائلة معظم حياتها. وفي الخليج، يمرّ هذا الهواء كله تقريباً عبر نظام التكييف أولاً.",
    },
    {
      name: "الفنادق والمنتجعات",
      kicker: "حماية تجربة النزيل",
      summary:
        "لا يستطيع النزيل وصف الهواء النقي، لكنه يصف الغرفة التي تفوح منها رائحة الانغلاق — ويكتب ذلك في تقييم يبقى منشوراً إلى الأبد.",
    },
    {
      name: "القصور ودور العبادة",
      kicker: "تحفّظ وشمول واحترام",
      summary:
        "مبانٍ ذات مكانة، حيث أنظمة التكييف معقّدة، وتتقلّب الإشغالية بين الفراغ والامتلاء، ولا يجوز أن يظهر أي أثر للتركيب.",
    },
    {
      name: "الرعاية الصحية",
      kicker: "المستشفيات والعيادات ودور الرعاية",
      summary:
        "بيئات يضطر فيها الأشخاص الأكثر عرضة للتلوث المحمول جواً إلى التواجد فيها.",
    },
    {
      name: "المدارس والحضانات",
      kicker: "حيث يقضي الأطفال يومهم",
      summary:
        "تجمع الفصول الدراسية أعلى كثافة إشغال في أي نوع من المباني، مع أصغر شاغليها وأكثرهم عرضة للتأثر.",
    },
    {
      name: "الصالات الرياضية والعافية",
      kicker: "اللياقة والسبا والتعافي",
      summary:
        "يأتي الناس إلى الصالة الرياضية لتحسين صحتهم، ثم يتنفسون فيها بعمق أكثر من أي مكان آخر في أسبوعهم.",
    },
    {
      name: "الضيافة والمنشآت",
      kicker: "المطاعم والمقاهي وقاعات المناسبات",
      summary:
        "المطابخ والحشود وساعات الخدمة الطويلة تُنتج حِملاً غازياً يخفّفه الشفط لكنه لا يزيله أبداً.",
    },
    {
      name: "النقل",
      kicker: "الأساطيل والنقل العام والطيران",
      summary:
        "أحجام صغيرة مغلقة، وتبدّل مستمر في الركاب، وهواء معاد تدويره — أكثر بيئات التعرّض تركيزاً على الإطلاق.",
    },
  ],
};
