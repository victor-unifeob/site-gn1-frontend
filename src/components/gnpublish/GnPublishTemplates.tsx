import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  description: string;
  image: string;
  features: string[];
  hasPreview?: boolean;
  previewUrl?: string;
}

export function GnPublishTemplates() {
  const t = useTranslations('Systems.gnpublish');

  // Templates
  const templates: Template[] = [
    {
      id: 1,
      name: 'BJCVS',
      description: t('templates.items.bjcvs.description'),
      image: '/thumbnails/gnpublish-templates/bjcvs.webp',
      features: [t('templates.items.bjcvs.features.health')],
      hasPreview: true,
      previewUrl: 'https://bjcvs.org/'
    },
    {
      id: 2,
      name: 'JBCS',
      description: t('templates.items.jbcs.description'),
      image: '/thumbnails/gnpublish-templates/jbcs.webp',
      features: [t('templates.items.jbcs.features.chemistry')],
      hasPreview: true,
      previewUrl: 'https://jbcs.sbq.org.br/'
    },
    {
      id: 3,
      name: 'Química Nova',
      description: t('templates.items.quimicaNova.description'),
      image: '/thumbnails/gnpublish-templates/quimica-nova.webp',
      features: [t('templates.items.quimicaNova.features.chemistry')],
      hasPreview: true,
      previewUrl: 'https://quimicanova.sbq.org.br/'
    },
    {
      id: 4,
      name: 'RVq',
      description: t('templates.items.rvq.description'),
      image: '/thumbnails/gnpublish-templates/rvq.webp',
      features: [t('templates.items.rvq.features.chemistry')],
      hasPreview: true,
      previewUrl: 'https://rvq.sbq.org.br/'
    },
    {
      id: 5,
      name: 'GGA',
      description: t('templates.items.gga.description'),
      image: '/thumbnails/gnpublish-templates/ggaging.webp',
      features: [t('templates.items.gga.features.health')],
      hasPreview: true,
      previewUrl: 'https://www.ggaging.com/'
    }
  ];

  // Função para lidar com o clique no preview
  const handlePreview = (previewUrl: string) => {
    window.open(previewUrl, '_blank');
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-4">
              {t('templates.subtitle')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              {t('templates.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('templates.description')}
            </p>
          </div>

          {/* Templates Carousel */}
          <div className="relative overflow-visible">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full overflow-visible"
            >
              <CarouselContent className="-ml-2 md:-ml-4 overflow-visible pb-12">
                {templates.map((template) => (
                  <CarouselItem key={template.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 overflow-visible">
                    <div className="p-2 h-full">
                      <Card className="h-full group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden flex flex-col p-0">
                        {/* Template Preview */}
                        <div className="relative overflow-hidden flex-shrink-0">
                          <img
                            src={template.image}
                            alt={template.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                          />
                        </div>

                        {/* Template Info */}
                        <CardContent className="px-6 flex flex-col flex-grow">
                          {/* Features */}
                          <div className="flex flex-wrap gap-1">
                            {template.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-4">
                            {template.name}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                            {template.description}
                          </p>

                        </CardContent>

                        {/* Preview Button com navegação */}
                        {template.hasPreview && template.previewUrl && (
                          <CardFooter className="p-6 pt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 w-full"
                              onClick={() => handlePreview(template.previewUrl!)}
                            >
                              <Eye className="w-4 h-4" />
                              {t('templates.previewButton')}
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <CarouselPrevious className="-left-12 hidden md:flex" />
              <CarouselNext className="-right-12 hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}