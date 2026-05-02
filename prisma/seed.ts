import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.rSVP.deleteMany();
  await prisma.invitation.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const hashedPassword = await bcrypt.hash("password123", 12);
  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@wirnikah.com",
      password: hashedPassword,
    },
  });

  // Create sample invitation
  const invitation = await prisma.invitation.create({
    data: {
      userId: user.id,
      slug: "ahmad-dan-sarah",
      template: "ELEGANT_GOLD",
      groomName: "Ahmad",
      groomFullName: "Ahmad Fauzi, S.Kom",
      groomParents: "Bapak H. Muhammad Fauzi & Ibu Hj. Siti Aminah",
      groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      groomInstagram: "@ahmad_fauzi",
      brideName: "Sarah",
      brideFullName: "Sarah Amelia, S.Pd",
      brideParents: "Bapak Dr. Surya Pratama & Ibu Ratna Dewi",
      bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
      brideInstagram: "@sarah_amelia",
      akadDate: "2026-06-12",
      akadTime: "08:00",
      akadVenue: "Masjid Agung Al-Azhar",
      akadAddress: "Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan",
      resepsiDate: "2026-06-12",
      resepsiTime: "11:00",
      resepsiVenue: "Ballroom Hotel Mulia",
      resepsiAddress: "Jl. Asia Afrika, Senayan, Jakarta Pusat",
      mapsLink: "https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
        "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600",
      ],
      galleryCaptions: [
        "Our First Date",
        "The Proposal",
        "Engagement Day",
        "Pre-wedding Shoot",
        "Together Forever",
        "Love Story",
      ],
      quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir. (QS. Ar-Rum: 21)",
      message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.",
      musicChoice: "romantic1",
      published: true,
    },
  });

  // Create second sample invitation - Javanese Traditional
  const invitation2 = await prisma.invitation.create({
    data: {
      userId: user.id,
      slug: "budi-dan-ani",
      template: "JAVANESE_TRADITIONAL",
      groomName: "Budi",
      groomFullName: "Budi Prasetyo, S.T.",
      groomParents: "Bapak Drs. Prasetyo Wibowo & Ibu Sri Mulyani",
      groomPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
      groomInstagram: "@budi_prasetyo",
      brideName: "Ani",
      brideFullName: "Ani Rahayu, S.E.",
      brideParents: "Bapak H. Rahayu Santoso & Ibu Hj. Kartini",
      bridePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
      brideInstagram: "@ani_rahayu",
      akadDate: "2026-08-15",
      akadTime: "09:00",
      akadVenue: "Pendopo Agung Mangkunegaran",
      akadAddress: "Jl. Ronggowarsito No. 1, Surakarta, Jawa Tengah",
      resepsiDate: "2026-08-15",
      resepsiTime: "12:00",
      resepsiVenue: "Gedung Graha Saba Buana",
      resepsiAddress: "Jl. Langen Harjo No. 1, Surakarta, Jawa Tengah",
      mapsLink: "https://maps.google.com/?q=Graha+Saba+Buana+Solo",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
      ],
      galleryCaptions: [
        "Prewedding Adat Jawa",
        "Lamaran",
        "Siraman",
        "Midodareni",
      ],
      quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. (QS. Ar-Rum: 21)",
      message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.",
      musicChoice: "romantic1",
      published: true,
    },
  });

  // Create sample RSVPs for invitation 2
  await prisma.rSVP.create({
    data: {
      invitationId: invitation2.id,
      name: "Sari Dewi",
      attendance: "HADIR",
      guests: 2,
      message: "Selamat menempuh hidup baru Budi & Ani! Semoga menjadi keluarga sakinah mawaddah warahmah.",
    },
  });

  // Create sample RSVPs for invitation 1
  const rsvpData = [
    { name: "Budi Santoso", attendance: "HADIR" as const, guests: 2, message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin 🤲" },
    { name: "Rina Wati", attendance: "HADIR" as const, guests: 3, message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. Selamat ya!" },
    { name: "Dian Permata", attendance: "HADIR" as const, guests: 2, message: "Happy wedding Ahmad & Sarah! Semoga langgeng sampai Jannah. Love you both! 💕" },
    { name: "Andi Pratama", attendance: "HADIR" as const, guests: 1, message: "Congratulations bro! Akhirnya nyusul juga. Semoga bahagia selalu ya!" },
    { name: "Maya Sari", attendance: "TIDAK_HADIR" as const, guests: 0, message: "Maaf tidak bisa hadir karena ada tugas di luar kota. Tapi doa terbaik untuk kalian berdua! 🙏" },
    { name: "Rizki Ramadhan", attendance: "HADIR" as const, guests: 2, message: "Alhamdulillah, turut berbahagia. Semoga Allah memberkahi pernikahan kalian. Aamiin." },
    { name: "Fitri Handayani", attendance: "HADIR" as const, guests: 1, message: "Selamat ya Sarah! Akhirnya hari yang ditunggu tiba. Semoga selalu bahagia! 🌸" },
    { name: "Hendra Wijaya", attendance: "HADIR" as const, guests: 4, message: "Selamat berbahagia! Sekeluarga insyaAllah hadir. Semoga menjadi keluarga yang berkah." },
    { name: "Siti Nurhaliza", attendance: "TIDAK_HADIR" as const, guests: 0, message: "Selamat ya! Maaf belum bisa hadir. Semoga pernikahan kalian penuh cinta dan kebahagiaan." },
    { name: "Agus Setiawan", attendance: "HADIR" as const, guests: 2, message: "Wah akhirnya! Selamat menempuh hidup baru. Semoga jadi pasangan yang saling melengkapi. 🎉" },
  ];

  for (const rsvp of rsvpData) {
    await prisma.rSVP.create({
      data: {
        invitationId: invitation.id,
        ...rsvp,
      },
    });
  }

  console.log("✅ Seed completed!");
  console.log(`   User: demo@wirnikah.com / password123`);
  console.log(`   Invitation 1: /undangan/ahmad-dan-sarah`);
  console.log(`   Invitation 2: /undangan/budi-dan-ani`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
