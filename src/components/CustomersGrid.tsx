// src/components/CustomersGrid.tsx

"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CustomersGrid = () => {
  const clients = [
    {
      name: "ABEN",
      logo: "/customers/aben.png",
      url: "https://abennacional.org.br/"
    },
    {
      name: "ABORL-CCF",
      logo: "/customers/aborl-ccf.png",
      url: "https://aborlccf.org.br/"
    },
    {
      name: "Elsevier",
      logo: "/customers/elsevier.png",
      url: "https://www.elsevier.com/"
    },
    {
      name: "ABP",
      logo: "/customers/abp.png",
      url: "https://www.abp.org.br/"
    },
    {
      name: "AMB",
      logo: "/customers/amb.png",
      url: "https://amb.org.br/"
    },
    {
      name: "ASBAI",
      logo: "/customers/asbai.png",
      url: "https://asbai.org.br/"
    },
    {
      name: "Associação Brasileira de Psicopedagogia",
      logo: "/customers/associação-brasileira-de-psicopedagogia.png",
      url: "https://www.abpp.com.br/"
    },
    {
      name: "Associação de Medicina Intensiva Brasileira",
      logo: "/customers/associação-de-medicina-intensiva-brasileira.png",
      url: "https://amib.org.br/"
    },
    {
      name: "Associação de Pediatria de São Paulo",
      logo: "/customers/associação-de-pediatria-de-são-paulo.png",
      url: "https://www.spsp.org.br/"
    },
    {
      name: "Associação Médica de Minas Gerais",
      logo: "/customers/associação-médica-de-minas-gerais.png",
      url: "https://ammg.org.br/"
    },
    {
      name: "Associação Nacional de Medicina do Trabalho",
      logo: "/customers/associação-nacional-de-medicina-do-trabalho.png",
      url: "https://www.anamt.org.br/portal/"
    },
    {
      name: "Associação Neurologia Cognitiva e do Comportamento",
      logo: "/customers/associação-neurologia-cognitiva-e-do-comportamento.png",
      url: "#"
    },
    {
      name: "Associação Paranaense de Pediatria",
      logo: "/customers/associação-paranaense-de-pediatria.png",
      url: "https://www.spp.org.br/"
    },
    {
      name: "CBC",
      logo: "/customers/cbc.png",
      url: "https://cbc.org.br/"
    },
    {
      name: "CBCD",
      logo: "/customers/cbcd.png",
      url: "https://cbcd.org.br/"
    },
    {
      name: "CBO",
      logo: "/customers/cbo.png",
      url: "https://www.cbo.net.br/home"
    },
    {
      name: "CBR",
      logo: "/customers/cbr.png",
      url: "https://cbr.org.br/"
    },
    {
      name: "Centro de Estudos Luis Guedes",
      logo: "/customers/centro-de-estudos-luis-guedes.png",
      url: "http://www.celg.org.br/"
    },
    {
      name: "CREMESP",
      logo: "/customers/cremesp.png",
      url: "https://www.cremesp.org.br/"
    },
    {
      name: "Emilio Ribas",
      logo: "/customers/emilio-ribas.png",
      url: "https://www.emilioribas.org/"
    },
    {
      name: "Federação Brasileira de Terapias Cognitivas",
      logo: "/customers/federação-brasileira-de-terapias-cognitivas.png",
      url: "https://www.fbtc.org.br/"
    },
    {
      name: "FGV",
      logo: "/customers/fgv.png",
      url: "https://portal.fgv.br/"
    },
    {
      name: "Fiocruz",
      logo: "/customers/fiocruz.png",
      url: "https://portal.fiocruz.br/"
    },
    {
      name: "FORL",
      logo: "/customers/forl.png",
      url: "https://forl.org.br/"
    },
    {
      name: "Fundação Faculdade de Medicina",
      logo: "/customers/fundação-faculdade-de-medicina.png",
      url: "https://ffm.br/ffm/portal/index.php"
    },
    {
      name: "Fundação Sociedade Brasileira de Pediatria",
      logo: "/customers/fundação-sociedade-brasileira-de-pediatria.png",
      url: "https://www.sbp.com.br/a-sbp/fundacao-sociedade-brasileira-de-pediatria/"
    },
    {
      name: "ILSL",
      logo: "/customers/ilsl.png",
      url: "http://www.ilsl.br/"
    },
    {
      name: "Instituto de Medicina Integral Prof Fernando Figueira",
      logo: "/customers/instituto-de-medicina-integral-prof-fernando-figueira.png",
      url: "https://imip.org.br/"
    },
    {
      name: "Instituto Emergência Brasil",
      logo: "/customers/instituto-emergência-brasil.png",
      url: "https://institutoemergenciabrasil.com.br/"
    },
    {
      name: "ITEGAM",
      logo: "/customers/itegam.png",
      url: "https://itegam.org.br/"
    },
    {
      name: "Mackenzie",
      logo: "/customers/mackenzie.png",
      url: "https://www.mackenzie.br/"
    },
    {
      name: "MPMG",
      logo: "/customers/mpmg.png",
      url: "https://www.mpmg.mp.br/portal/"
    },
    {
      name: "RLAE",
      logo: "/customers/rlae.png",
      url: "http://rlae.eerp.usp.br/"
    },
    {
      name: "SBAC",
      logo: "/customers/sbac.png",
      url: "https://www.sbac.org.br/"
    },
    {
      name: "SBCCV",
      logo: "/customers/sbccv.png",
      url: "http://www.sbccv.org.br/"
    },
    {
      name: "SBCP - Sociedade Brasileira de Cirurgia Plástica",
      logo: "/customers/sbcp-sociedade-brasileira-de-cirurgia-plástica.png",
      url: "https://www.cirurgiaplastica.org.br/"
    },
    {
      name: "SBCT",
      logo: "/customers/sbct.png",
      url: "https://www.sbct.com.br/"
    },
    {
      name: "SBD",
      logo: "/customers/sbd.png",
      url: "https://www.sbd.org.br/"
    },
    {
      name: "SBED",
      logo: "/customers/sbed.png",
      url: "https://www.sbed.org/home.php"
    },
    {
      name: "SBGG",
      logo: "/customers/sbgg.png",
      url: "https://sbgg.org.br/"
    },
    {
      name: "SBQ - Sociedade Brasileira de Química",
      logo: "/customers/sbq-sociedade-brasileira-de-química.png",
      url: "https://www.sbq.org.br/"
    },
    {
      name: "SciELO",
      logo: "/customers/scielo.png",
      url: "https://scielo.org/"
    },
    {
      name: "Sociedade Brasileira de Oncologia Clínica",
      logo: "/customers/sociedade-brasileira-de-oncologia-clínica.png",
      url: "https://sboc.org.br/"
    },
    {
      name: "Sociedade Brasileira de Reprodução Assistida",
      logo: "/customers/sociedade-brasileira-de-reprodução-assistida.png",
      url: "https://sbra.com.br/"
    },
    {
      name: "Sociedade Brasileira para o Progresso da Ciência",
      logo: "/customers/sociedade-brasileira-para-o-progresso-da-ciencia.png",
      url: "https://portal.sbpcnet.org.br/"
    },
    {
      name: "SOPERJ",
      logo: "/customers/soperj.png",
      url: "http://soperj.com.br/"
    },
    {
      name: "Thieme",
      logo: "/customers/thieme.png",
      url: "https://www.thieme.com/en-br"
    },
    {
      name: "UNIPAC Barbacena",
      logo: "/customers/unipac-barbacena.png",
      url: "https://www.unipac.br/barbacena/"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {clients.map((client, index) => (
          <Card
            key={index}
            className="border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:shadow-md"
          >
            <CardContent className="flex aspect-[8/3] items-center justify-center p-3 md:p-4">
              {client.url !== "#" ? (
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full group"
                  title={client.name}
                >
                  <img
                    src={client.logo}
                    alt={`Logo ${client.name}`}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                    width={240}
                    height={90}
                  />
                </a>
              ) : (
                <div
                  className="flex items-center justify-center w-full h-full"
                  title={client.name}
                >
                  <img
                    src={client.logo}
                    alt={`Logo ${client.name}`}
                    className="max-w-full max-h-full object-contain filter grayscale"
                    width={240}
                    height={90}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomersGrid;