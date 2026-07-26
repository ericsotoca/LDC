import { Question, Profile, Reward } from "./types";

interface RawQuestion {
  id: number;
  title: string;
  question: string;
  answers: string[];
  cCode: string;
  importance: string;
  level: string;
}

const RAW_QUESTIONS: RawQuestion[] = [
  {
    id: 1,
    title: "Tabac",
    question: "Fumez-vous ?",
    answers: [
      "Oui, régulièrement",
      "Oui, occasionnellement",
      "Non, je ne fume pas"
    ],
    cCode: "k", // index 2 -> "k"
    importance: "Critère éliminatoire",
    level: "Niveau 1 - Facile"
  },
  {
    id: 2,
    title: "Alcool",
    question: "Quelle est votre relation avec l'alcool ?",
    answers: [
      "J'aime faire la fête régulièrement avec de l'alcool",
      "Je bois occasionnellement dans un contexte social",
      "Je ne bois quasiment jamais"
    ],
    cCode: "mk", // index 1, 2 -> "mk"
    importance: "Critère important",
    level: "Niveau 2 - Facile"
  },
  {
    id: 3,
    title: "Taille",
    question: "Quelle est votre taille ?",
    answers: [
      "Moins de 1m55",
      "Entre 1m55 et 1m60",
      "Entre 1m60 et 1m65",
      "Entre 1m65 et 1m70",
      "1m70 ou plus"
    ],
    cCode: "mkp", // index 1, 2, 3 -> "mkp"
    importance: "Critère important",
    level: "Niveau 3 - Moyen"
  },
  {
    id: 4,
    title: "Poids",
    question: "Quel est votre poids ?",
    answers: [
      "Moins de 40 kg",
      "Entre 40 et 45 kg",
      "Entre 45 et 50 kg",
      "Entre 50 et 55 kg",
      "Entre 55 et 60 kg",
      "Entre 60 et 65 kg",
      "Entre 65 et 70 kg",
      "Entre 70 et 75 kg",
      "Entre 75 et 80 kg",
      "80 kg ou plus"
    ],
    cCode: "kpat", // index 2, 3, 4, 5 -> "kpat"
    importance: "Critère important",
    level: "Niveau 4 - Moyen"
  },
  {
    id: 5,
    title: "Liberté",
    question: "Quelle place occupe la liberté dans votre vie ?",
    answers: [
      "J'aime avoir mon indépendance, découvrir et choisir mon rythme de vie",
      "Je préfère une vie très organisée avec peu de changements",
      "Je privilégie principalement la stabilité"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère majeur",
    level: "Niveau 5 - Moyen"
  },
  {
    id: 6,
    title: "Temps disponible",
    question: "Quelle place donnez-vous au temps libre dans votre vie ?",
    answers: [
      "Mon travail occupe presque tout mon temps",
      "Je trouve un équilibre entre travail et vie personnelle",
      "Je privilégie une vie avec beaucoup de disponibilité pour les projets et loisirs"
    ],
    cCode: "mk", // index 1, 2 -> "mk"
    importance: "Critère majeur",
    level: "Niveau 6 - Avancé"
  },
  {
    id: 7,
    title: "Voyages",
    question: "Quelle importance ont les voyages et découvertes dans votre vie ?",
    answers: [
      "J'adore voyager et découvrir de nouveaux endroits",
      "J'aime voyager occasionnellement",
      "Je préfère rester principalement dans mon environnement habituel"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère important",
    level: "Niveau 7 - Avancé"
  },
  {
    id: 8,
    title: "Développement personnel",
    question: "Quel est votre rapport au développement personnel et à l'apprentissage ?",
    answers: [
      "J'aime apprendre, évoluer et découvrir de nouvelles choses",
      "Je m'intéresse parfois à ces sujets",
      "Ce n'est pas vraiment une priorité pour moi"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère majeur",
    level: "Niveau 8 - Difficile"
  },
  {
    id: 9,
    title: "Vision du couple",
    question: "Pour vous, une relation idéale est plutôt :",
    answers: [
      "Deux personnes qui grandissent ensemble tout en gardant leur liberté",
      "Une relation très fusionnelle avec beaucoup de présence permanente",
      "Une relation principalement basée sur le quotidien et la routine"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère majeur",
    level: "Niveau 9 - Difficile"
  },
  {
    id: 10,
    title: "Projet de vie",
    question: "Quel type de vie vous attire le plus ?",
    answers: [
      "Une vie avec des projets, découvertes, voyages et nouvelles expériences",
      "Une vie calme et principalement centrée sur la routine",
      "Une vie principalement consacrée au travail et aux obligations"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère final",
    level: "Niveau 10 - Expert"
  },
  {
    id: 11,
    title: "Communication",
    question: "Face à un désaccord important, comment réagissez-vous ?",
    answers: [
      "J'exprime immédiatement mes émotions à chaud, quitte à être vive",
      "Je prends du recul pour en parler calmement et de manière constructive",
      "Je préfère éviter le conflit et laisser le temps faire les choses"
    ],
    cCode: "m", // index 1 -> "m"
    importance: "Critère important",
    level: "Niveau 11 - Expert"
  },
  {
    id: 12,
    title: "Lieu de vie",
    question: "Quel serait votre environnement de vie idéal à long terme ?",
    answers: [
      "En plein centre d'une grande métropole active et dynamique",
      "Dans une maison chaleureuse au calme, proche de la nature",
      "Un mode de vie plus flexible ou nomade, prêt(e) à déménager souvent"
    ],
    cCode: "mk", // index 1, 2 -> "mk"
    importance: "Critère important",
    level: "Niveau 12 - Expert"
  },
  {
    id: 13,
    title: "Ouverture d'esprit",
    question: "Quelle est votre ouverture à l'inconnu, à l'intuition ou à la spiritualité ?",
    answers: [
      "C'est un pilier de ma vie, j'écoute énormément mon intuition et mes ressentis",
      "J'y suis ouvert(e) et curieux(se) sans que ce soit mon unique guide",
      "Je suis une personne avant tout pragmatique, logique et rationnelle"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère majeur",
    level: "Niveau 13 - Élite"
  },
  {
    id: 14,
    title: "Finances",
    question: "Quelle est votre philosophie vis-à-vis de l'argent dans un couple ?",
    answers: [
      "Compte commun obligatoire pour tout fusionner équitablement",
      "Comptes séparés avec répartition libre, préservant l'indépendance de chacun",
      "Je préfère ne pas du tout me préoccuper de l'aspect financier"
    ],
    cCode: "m", // index 1 -> "m"
    importance: "Critère important",
    level: "Niveau 14 - Élite"
  },
  {
    id: 15,
    title: "Hygiène de vie",
    question: "Quelle attention portez-vous à votre alimentation et votre forme ?",
    answers: [
      "J'y fais très attention (alimentation équilibrée, soin de mon corps...)",
      "Je mange et vis au gré de mes envies, sans me fixer de règles",
      "Ce n'est absolument pas une préoccupation pour moi"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère important",
    level: "Niveau 15 - Maître"
  },
  {
    id: 16,
    title: "Jeux & Esprit d'Équipe",
    question: "Quel est votre intérêt pour les jeux de stratégie, d'esprit ou de réflexion ?",
    answers: [
      "J'adore y jouer et stimuler mon sens tactique (Awalé, échecs, jeux de société...)",
      "Je n'y porte aucun intérêt particulier, je trouve cela fastidieux",
      "Je n'aime que les jeux fondés purement sur la chance ou le hasard"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère complice",
    level: "Niveau 16 - Stratège"
  },
  {
    id: 17,
    title: "Technologie & Déconnexion",
    question: "Comment gérez-vous les écrans lors des moments privilégiés à deux ?",
    answers: [
      "Je garde souvent mon smartphone à portée de main",
      "Je déconnecte volontiers pour accorder une attention exclusive à l'autre",
      "Je n'accorde aucune importance particulière à ce sujet"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère important",
    level: "Niveau 17 - Grand Maître"
  },
  {
    id: 18,
    title: "Animaux domestiques",
    question: "Quel est votre rapport aux animaux de compagnie ?",
    answers: [
      "J'adore vivre avec des animaux chez moi",
      "Je les apprécie à l'extérieur mais je préfère ne pas en héberger",
      "Je ne souhaite absolument pas d'animaux dans mon environnement"
    ],
    cCode: "mk", // index 1, 2 -> "mk"
    importance: "Critère important",
    level: "Niveau 18 - Grand Maître"
  },
  {
    id: 19,
    title: "Esthétique & Culture",
    question: "Quelle place tient l'art, le beau ou la culture dans votre vie ?",
    answers: [
      "Essentielle, j'ai besoin d'harmonie visuelle, d'art et de culture",
      "Sympathique mais tout à fait secondaire pour moi",
      "Aucune, ce n'est vraiment pas ma sensibilité"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère majeur",
    level: "Niveau 19 - Légende"
  },
  {
    id: 20,
    title: "Objectif ultime",
    question: "Dans quel état d'esprit abordez-vous cette démarche ?",
    answers: [
      "Avec l'envie sincère de construire une relation durable, saine et profonde",
      "Par simple curiosité ou jeu, pour voir ce qu'il en ressort",
      "Pour s'amuser temporairement sans projection future"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère suprême",
    level: "Niveau 20 - Destin"
  },
  {
    id: 21,
    title: "Indépendance financière",
    question: "Quelle est votre approche vis-à-vis de l'investissement et de la gestion budgétaire ?",
    answers: [
      "Je dépense mes revenus au jour le jour sans me soucier de l'avenir",
      "Je suis prévoyante, j'aime investir et bâtir une autonomie financière (PEA, immobilier...)",
      "L'argent est tabou pour moi, je délègue entièrement cet aspect"
    ],
    cCode: "m", // index 1 -> "m"
    importance: "Critère stratégique",
    level: "Niveau 21 - Esprit Libre"
  },
  {
    id: 22,
    title: "Besoins de solitude & Cocon",
    question: "Dans une relation de couple, comment vivez-vous les moments d'isolement de votre partenaire ?",
    answers: [
      "Je les respecte pleinement car j'ai moi-même un grand besoin d'autonomie et d'espace",
      "Je me sens rapidement négligée ou anxieuse s'il ne m'accorde pas toute son attention",
      "Je préfère que l'on partage chaque instant libre sans exception"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère majeur",
    level: "Niveau 22 - Esprit Libre"
  },
  {
    id: 23,
    title: "Entrepreneuriat & Projets",
    question: "Quelle est votre vision du travail indépendant et de la création de projets ?",
    answers: [
      "Je soutiens et admire l'esprit entrepreneurial, la liberté et l'initiative",
      "Je privilégie la sécurité d'un emploi salarié avec des horaires très fixes",
      "L'investissement personnel dans des projets me semble secondaire"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère important",
    level: "Niveau 23 - Visionnaire"
  },
  {
    id: 24,
    title: "Profondeur d'échange",
    question: "Quel type de discussion nourrit le plus votre relation ?",
    answers: [
      "Des potins, bavardages quotidiens et discussions informelles",
      "Des échanges profonds sur les idées, la philosophie, la stratégie, la psychologie ou l'avenir",
      "Le silence partagé, je ne ressens pas le besoin de grandes discussions"
    ],
    cCode: "m", // index 1 -> "m"
    importance: "Critère majeur",
    level: "Niveau 24 - Alchimiste"
  },
  {
    id: 25,
    title: "Nature & Altitude",
    question: "Quelle est votre sensibilité aux cadres de vie calmes, comme la montagne ou la campagne ?",
    answers: [
      "J'y vis très bien, j'apprécie le calme, le grand air et la tranquillité (comme dans les Hautes-Alpes)",
      "J'au absolument besoin du dynamisme et du bruit continu des grandes villes",
      "Je m'y rends uniquement de passage pour des séjours courts"
    ],
    cCode: "xk", // index 0, 2 -> "xk"
    importance: "Critère de vie",
    level: "Niveau 25 - Sérénité"
  },
  {
    id: 26,
    title: "Routines Créatives",
    question: "Comment réagissez-vous si votre partenaire s'isole de longues heures pour un projet créatif ?",
    answers: [
      "Je le laisse dans sa bulle de concentration et j'en profite pour vaquer à mes propres activités",
      "Je me lasse et tente régulièrement de l'interrompre pour passer du temps à deux",
      "Je considère cela comme une perte de temps par rapport aux tâches ménagères"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère majeur",
    level: "Niveau 26 - L'Artiste"
  },
  {
    id: 27,
    title: "Gestion des Émotions",
    question: "Quelle attitude préférez-vous chez quelqu'un qui fait face à un stress ou une émotion difficile ?",
    answers: [
      "L'expression immédiate et l'effusion émotionnelle expressive (pleurs, cris...)",
      "La retenue, l'auto-analyse et une prise de recul logique avant d'en discuter calmement",
      "L'évitement permanent, faire semblant que rien ne s'est passé"
    ],
    cCode: "m", // index 1 -> "m"
    importance: "Critère d'alignement",
    level: "Niveau 27 - Force Intérieure"
  },
  {
    id: 28,
    title: "Curiosité Intellectuelle",
    question: "Comment nourrissez-vous votre esprit au quotidien ?",
    answers: [
      "Par l'apprentissage constant : lectures, podcasts, formations ou exploration de sujets passionnants",
      "Je me focalise uniquement sur mes acquis professionnels actuels",
      "Je préfère le divertissement pur sans trop solliciter mon intellect"
    ],
    cCode: "x", // index 0 -> "x"
    importance: "Critère majeur",
    level: "Niveau 28 - Éveil"
  },
  {
    id: 29,
    title: "Tranche d'âge",
    question: "Quel est votre âge ?",
    answers: [
      "Moins de 35 ans (30 - 34 ans)",
      "Entre 35 et 45 ans",
      "Entre 45 et 55 ans",
      "Entre 55 et 65 ans",
      "Plus de 65 ans (65 - 70+ ans)"
    ],
    cCode: "mk", // index 1 & 2 -> 35 à 55 ans
    importance: "Critère éliminatoire",
    level: "Niveau 29 - Maître"
  },
  {
    id: 30,
    title: "Lieu d'habitation",
    question: "Où habitez-vous ?",
    answers: [
      "Dép. 05",
      "Dép. limitrophe au 05",
      "Extérieur au 05"
    ],
    cCode: "xm", // index 0, 1 -> "xm"
    importance: "Critère suprême",
    level: "Niveau 30 - Destinée"
  }
];

const decodeCompat = (code: string): number[] => {
  const map: { [key: string]: number } = {
    'x': 0, 'm': 1, 'k': 2, 'p': 3, 'a': 4, 't': 5, 'd': 6, 'h': 7, 'y': 8, 'v': 9
  };
  return code.split("").map(char => map[char] ?? 0);
};

export const QUESTIONS: Question[] = RAW_QUESTIONS.map(q => ({
  id: q.id,
  title: q.title,
  question: q.question,
  answers: q.answers,
  defaultCompat: decodeCompat(q.cCode),
  importance: q.importance,
  level: q.level
}));

export const ENCOURAGING_MESSAGES = [
  "C'est un excellent début ! Voyons la suite...",
  "Intéressant... Vous semblez bien vous connaître !",
  "On avance ! Les choses sérieuses commencent.",
  "Vous vous en sortez à merveille !",
  "Une belle harmonie se dessine...",
  "Nous approchons des critères les plus profonds...",
  "Quelle sincérité ! Continuez ainsi.",
  "Presque au bout du voyage. Restez authentique !",
  "Dernière ligne droite... Le suspense est à son comble !",
  "Niveau supérieur débloqué. Voyons la suite !",
  "Impressionnant, la compatibilité résiste !",
  "Votre sincérité est palpable.",
  "Vous franchissez les étapes comme un(e) pro.",
  "Les questions se font de plus en plus pointues...",
  "Incroyable parcours jusqu'ici !",
  "Sensationnel. Serez-vous de taille pour la suite ?",
  "La connexion semble extrêmement forte...",
  "Plus que quelques paliers secrets...",
  "L'ultime question approche !",
  "L'esprit libre se révèle... Excellent !",
  "Vos visions stratégiques s'alignent !",
  "Remarquable perspicacité face aux défis !",
  "Le niveau ultime se profile à l'horizon...",
  "Est-ce la symbiose absolue ?",
  "Fascinant. La vérité est toute proche...",
  "La complicité monte d'un cran !",
  "Vous touchez du doigt l'indépendance à deux...",
  "Exceptionnelle démonstration d'harmonie !",
  "Serez-vous la perle rare recherchée ?",
  "La toute dernière porte du cœur va s'ouvrir !"
];

export const DEFAULT_PROFILE: Profile = {
  name: "Eric",
  compatAnswers: QUESTIONS.reduce((acc, q) => {
    acc[q.id] = q.defaultCompat;
    return acc;
  }, {} as { [id: number]: number[] }),
  secretCode: "EROS-2026",
  messengerUsername: "eric.sotoca"
};

export const MILESTONE_REWARDS: { [milestone: number]: Reward } = {
  5: {
    milestone: 5,
    title: "Le Joker 'Anti-Blanc Gênant' 🤫",
    description: "Vous venez de franchir le premier palier avec beaucoup de naturel ! Votre complicité commence à prendre forme. Pour assurer la suite, voici un joker indispensable.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    quote: "« Le rire est le chemin le plus court entre deux personnes qui s'apprivoisent. »",
    rewardText: "Promesse n°1 : Un bon pour une anecdote insolite si un silence dure plus de 10 secondes lors du premier rendez-vous que tu vas peut-être obtenir ou pas..."
  },
  10: {
    milestone: 10,
    title: "Le Privilège de la Question Vérité 🗝️",
    description: "Déjà 10 questions d'une franchise absolue ! C'est l'heure d'obtenir un pouvoir exclusif pour notre rencontre.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    quote: "« La curiosité est un joli défaut lorsqu'elle mène à une complicité sincère. »",
    rewardText: "Promesse n°2 : Le droit de me poser une question de ton choix (même très indiscrète) lors de notre rendez-vous, avec obligation d'y répondre avec une sincérité totale."
  },
  15: {
    milestone: 15,
    title: "La Promesse du Dessert Partagé (ou Volé !) 🍰",
    description: "Déjà 15 questions franchies avec succès ! Vous entrez dans le cercle très fermé des complices. Gravons cela avec gourmandise.",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    quote: "« Le bonheur ne vaut d'être vécu que s'il est partagé... surtout s'il a un goût de chocolat. »",
    rewardText: "Promesse n°3 : Le droit contractuel et absolu de piocher avec ta cuillère dans mon dessert si le tien est moins bon (ou juste par gourmandise), si l'aventure va plus loin..."
  },
  20: {
    milestone: 20,
    title: "Le Ticket du Choix de la Reine 🎫",
    description: "20 paliers franchis sans faiblir ! Votre franchise mérite d'être honorée par une quatrième promesse.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    quote: "« Les meilleures histoires commencent souvent par un simple échange authentique autour d'un bon verre. »",
    rewardText: "Promesse n°4 : Le droit absolu de soit, choisir le lieu de notre 1er rendez-vous, soit me demander 3 propositions sur mesure."
  },
  25: {
    milestone: 25,
    title: "Le Cercle des Complices d'Élite 🌟",
    description: "25 questions franchies avec brio ! Vous faites partie du top 1% des personnes les plus compatibles.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    quote: "« La complicité, c'est quand un regard suffit pour tout se dire. »",
    rewardText: "Promesse n°5 : Un pass VIP pour choisir l'activité ou le thème de notre seconde sortie si la première nous enchante !"
  },
  30: {
    milestone: 30,
    title: "L'Ultime Sésame : Le Code Secret & Mon 06 📱",
    description: "Victoire totale ! 30 questions franchies sans un seul faux pas. Vous avez prouvé une compatibilité extraordinaire.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    quote: "« Le hasard fait bien les choses, mais un petit coup de pouce du destin change parfois une vie. »",
    rewardText: "Promesse n°6 (Ultime) : Le déblocage direct de mon numéro en fin de parcours avec le code secret unique à m'envoyer par SMS !"
  }
};

