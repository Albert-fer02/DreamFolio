"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Eye, Zap, Star } from 'lucide-react';

export const ElegantPaletteDemo = () => {
  const [activeTab, setActiveTab] = React.useState<'colors' | 'effects' | 'animations'>('colors');

  const elegantColors = [
    {
      name: "Azul Cian Elegante",
      color: "hsl(185 75% 48%)",
      description: "Primary - Sofisticado y moderno",
      category: "primary",
      hex: "#00D4D4"
    },
    {
      name: "Púrpura Sofisticado",
      color: "hsl(265 45% 58%)",
      description: "Secondary - Elegante y refinado",
      category: "secondary",
      hex: "#8B5CF6"
    },
    {
      name: "Verde Esmeralda",
      color: "hsl(155 65% 48%)",
      description: "Accent - Natural y elegante",
      category: "accent",
      hex: "#10B981"
    },
    {
      name: "Dorado Elegante",
      color: "hsl(45 75% 58%)",
      description: "Chart - Sofisticado y premium",
      category: "chart",
      hex: "#F59E0B"
    }
  ];

  const elegantEffects = [
    {
      name: "Glassmorphism Elegante",
      class: "elegant-card",
      description: "Efecto de cristal refinado con blur avanzado",
      preview: "bg-card/60 backdrop-blur-2xl"
    },
    {
      name: "Botón Elegante",
      class: "elegant-button",
      description: "Gradiente suave con sombras elegantes",
      preview: "bg-gradient-to-r from-primary to-secondary"
    },
    {
      name: "Input Elegante",
      class: "elegant-input",
      description: "Campo de entrada con efectos sutiles",
      preview: "bg-input/50 backdrop-blur-sm"
    },
    {
      name: "Badge Elegante",
      class: "elegant-badge",
      description: "Etiqueta con bordes suaves",
      preview: "bg-primary/15 border-primary/25"
    }
  ];

  const elegantAnimations = [
    {
      name: "Fade In Elegante",
      class: "elegant-fade-in",
      description: "Aparece suavemente desde abajo",
      duration: "0.8s"
    },
    {
      name: "Slide Up Elegante",
      class: "elegant-slide-up",
      description: "Desliza hacia arriba con gracia",
      duration: "0.6s"
    },
    {
      name: "Hover Lift",
      class: "hover-lift",
      description: "Elevación suave al pasar el mouse",
      duration: "0.5s"
    },
    {
      name: "Glow Effect",
      class: "hover-glow",
      description: "Brillo elegante en hover",
      duration: "0.5s"
    }
  ];

  return (
    <div className="py-16 bg-gradient-elegant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Elegante */}
        <div className="text-center mb-16">
          <Badge className="elegant-badge mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            PALETA ELEGANTE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">
            <span className="gradient-text-primary">Diseño Sofisticado</span> &{" "}
            <span className="gradient-text-financial">Moderno</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Una paleta de colores refinada que combina elegancia, sofisticación y cuidado ocular. 
            Diseñada para crear experiencias visuales excepcionales.
          </p>
        </div>

        {/* Tabs de Navegación */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { id: 'colors', icon: Palette, label: 'Colores' },
            { id: 'effects', icon: Zap, label: 'Efectos' },
            { id: 'animations', icon: Star, label: 'Animaciones' }
          ].map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'default' : 'outline'}
              onClick={() => setActiveTab(id as any)}
              className="elegant-button"
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Contenido de Tabs */}
        {activeTab === 'colors' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {elegantColors.map((color, index) => (
              <Card key={index} className="elegant-card elegant-fade-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">{color.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {color.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Muestra de color */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl border-2 border-border/30 shadow-soft"
                        style={{ backgroundColor: color.color }}
                      />
                      <div>
                        <p className="text-sm font-code">{color.color}</p>
                        <p className="text-xs text-muted-foreground">{color.hex}</p>
                      </div>
                    </div>
                    
                    {/* Variaciones */}
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        className="h-8 rounded border border-border/30"
                        style={{ backgroundColor: color.color + '20' }}
                      />
                      <div 
                        className="h-8 rounded border border-border/30"
                        style={{ backgroundColor: color.color + '40' }}
                      />
                      <div 
                        className="h-8 rounded border border-border/30"
                        style={{ backgroundColor: color.color + '60' }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {color.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="grid md:grid-cols-2 gap-8">
            {elegantEffects.map((effect, index) => (
              <Card key={index} className="elegant-card elegant-slide-up">
                <CardHeader>
                  <CardTitle className="text-xl">{effect.name}</CardTitle>
                  <CardDescription>{effect.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Preview del efecto */}
                  <div className={`p-6 rounded-xl ${effect.class} transition-all duration-300 hover:scale-105`}>
                    <p className="text-sm font-code text-center">{effect.preview}</p>
                  </div>
                  
                  {/* Código CSS */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs font-code text-muted-foreground">
                      .{effect.class} {'{'}
                    </p>
                    <p className="text-xs font-code text-muted-foreground ml-4">
                      @apply {effect.preview};
                    </p>
                    <p className="text-xs font-code text-muted-foreground">
                      {'}'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'animations' && (
          <div className="grid md:grid-cols-2 gap-8">
            {elegantAnimations.map((animation, index) => (
              <Card key={index} className="elegant-card">
                <CardHeader>
                  <CardTitle className="text-xl">{animation.name}</CardTitle>
                  <CardDescription>{animation.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Demo de animación */}
                  <div className={`p-8 rounded-xl bg-gradient-subtle border border-border/30 ${animation.class} cursor-pointer transition-all duration-300 hover:scale-105`}>
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Hover para ver efecto</p>
                    </div>
                  </div>
                  
                  {/* Información de la animación */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-primary">Duración:</p>
                      <p className="text-muted-foreground">{animation.duration}</p>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Clase:</p>
                      <p className="text-muted-foreground font-code">{animation.class}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Características de la Paleta */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="elegant-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                <CardTitle>Cuidado Ocular</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Colores optimizados para reducir la fatiga visual durante sesiones largas de trabajo.
              </p>
            </CardContent>
          </Card>

          <Card className="elegant-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-secondary" />
                <CardTitle>Efectos Sofisticados</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Glassmorphism refinado y efectos de profundidad para una experiencia visual premium.
              </p>
            </CardContent>
          </Card>

          <Card className="elegant-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-accent" />
                <CardTitle>Animaciones Suaves</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Transiciones elegantes y animaciones fluidas que mejoran la interactividad.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Elegante */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            ¿Listo para implementar esta paleta elegante en tu proyecto?
          </p>
          <Button className="elegant-button text-lg px-8 py-4">
            <Sparkles className="w-5 h-5 mr-2" />
            Implementar Paleta Elegante
          </Button>
        </div>
      </div>
    </div>
  );
}; 