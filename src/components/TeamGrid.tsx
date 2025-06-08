// src/components/TeamGrid.tsx

"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FaLinkedinIn } from 'react-icons/fa';

interface TeamMember {
  id: number;
  name: string;
  positionKey: string;
  image: string;
  linkedinUrl?: string;
}

interface TeamGridProps {
  translations: {
    positions: {
      founderCeo: string;
      coo: string;
      executiveEditor: string;
      developer: string;
      editor: string;
      development: string;
      commercial: string;
      financial: string;
      secretary: string;
    };
  };
}

const TeamGrid: React.FC<TeamGridProps> = ({ translations }) => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Márcio Argachof",
      positionKey: "founderCeo",
      image: "/team/marcio-argachof.png",
      linkedinUrl: "https://linkedin.com/in/marcio-argachof"
    },
    {
      id: 2,
      name: "Patricia Palazi Argachof",
      positionKey: "coo",
      image: "/team/patricia-palazi-argachof.png",
      linkedinUrl: "https://linkedin.com/in/patricia-palazi-argachof"
    },
    {
      id: 3,
      name: "Patricia Argachof",
      positionKey: "executiveEditor",
      image: "/team/patricia-argachof.png",
      linkedinUrl: "https://linkedin.com/in/patricia-argachof"
    },
    {
      id: 4,
      name: "Victor Argachof",
      positionKey: "developer",
      image: "/team/victor-argachof.png",
      linkedinUrl: "https://www.linkedin.com/in/victor-argachof/"
    },
    {
      id: 5,
      name: "Ana Carolina Marim da Silva",
      positionKey: "editor",
      image: "/team/ana-carolina-marim-da-silva.png"
    },
    {
      id: 6,
      name: "Andreia de Castro",
      positionKey: "editor",
      image: "/team/andreia-de-castro.png"
    },
    {
      id: 7,
      name: "Elaine Cristina de Souza Novelo",
      positionKey: "editor",
      image: "/team/elaine-cristina-de-souza-novelo.png"
    },
    {
      id: 8,
      name: "Euclides Neto",
      positionKey: "development",
      image: "/team/euclides-neto.png"
    },
    {
      id: 9,
      name: "Luis Paulo Rosa Jr",
      positionKey: "commercial",
      image: "/team/luis-paulo-rosa-jr.png"
    },
    {
      id: 10,
      name: "Marcelo Binati de Almeida",
      positionKey: "development",
      image: "/team/marcelo-binati-de-almeida.png"
    },
    {
      id: 11,
      name: "Marcia Zuin",
      positionKey: "editor",
      image: "/team/marcia-zuin.png"
    },
    {
      id: 12,
      name: "Nathalia Oliveira de Luca",
      positionKey: "financial",
      image: "/team/nathalia-oliveira-de-luca.png"
    },
    {
      id: 13,
      name: "Simone Elize Aguiar Moreno",
      positionKey: "editor",
      image: "/team/simone-elize-aguiar-moreno.png"
    },
    {
      id: 14,
      name: "Vitor Hornink",
      positionKey: "editor",
      image: "/team/vitor-hornink.png"
    },
    {
      id: 15,
      name: "Yara",
      positionKey: "secretary",
      image: "/team/yara.png"
    },
    {
      id: 16,
      name: "Yngrid da Silva Narciso",
      positionKey: "editor",
      image: "/team/yngrid-da-silva-narciso.png"
    }
  ];

  // Separar e ordenar membros: Argachof no topo, resto em ordem alfabética
  const sortedMembers = teamMembers.sort((a, b) => {
    const isArgachofA = a.name.includes('Argachof');
    const isArgachofB = b.name.includes('Argachof');

    if (isArgachofA && !isArgachofB) return -1;
    if (!isArgachofA && isArgachofB) return 1;

    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sortedMembers.map((member) => {
          const isArgachof = member.name.includes('Argachof');
          const position = translations.positions[member.positionKey as keyof typeof translations.positions];

          return (
            <Card
              key={member.id}
              className="group border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-lg relative overflow-hidden rounded-lg"
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Imagem do membro */}
                  <div className="aspect-[4/5] overflow-hidden rounded-t-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Overlay do LinkedIn para membros Argachof - mais suave */}
                  {isArgachof && member.linkedinUrl && (
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600/90 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110 backdrop-blur-sm shadow-lg"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <FaLinkedinIn size={24} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Informações do membro */}
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    {position}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TeamGrid;