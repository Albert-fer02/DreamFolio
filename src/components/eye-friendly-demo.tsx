"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Sun, Moon, Monitor, Smartphone } from 'lucide-react';

export const EyeFriendlyDemo = () => {
  const [currentMode, setCurrentMode] = React.useState<'light' | 'dark' | 'auto'>('dark');

  const colorPalette = [
    {
      name: "Cyan Suavizado",
      color: "hsl(180 70% 45%)",
      description: "Primary - Menos saturado, más legible",
      oldColor: "hsl(180 100% 50%)"
    },
    {
      name: "Púrpura Suavizado", 
      color: "hsl(260 40% 55%)",
      description: "Secondary - Reducido de 60% a 55% lightness",
      oldColor: "hsl(260 50% 60%)"
    },
    {
      name: "Verde Suavizado",
      color: "hsl(120 60% 45%)", 
      description: "Accent - De 100% a 60% saturation",
      oldColor: "hsl(120 100% 50%)"
    },
    {
      name: "Fondo Principal",
      color: "hsl(220 15% 12%)",
      description: "Más claro y menos agresivo",
      oldColor: "hsl(220 25% 7%)"
    }
  ];

  const improvements = [
    {
      title: "🎯 Contraste Optimizado",
      description: "Ratio de contraste reducido de 15:1 a 7:1 para menor fatiga visual",
      benefit: "Menos cansancio ocular durante sesiones largas"
    },
    {
      title: "🌈 Saturación Reducida", 
      description: "Colores principales reducidos de 100% a 60-70% de saturación",
      benefit: "Colores más naturales y menos agresivos"
    },
    {
      title: "💡 Glows Sutiles",
      description: "Efectos de brillo reducidos de 0.3-0.4 a 0.2-0.25 de opacidad",
      benefit: "Menos distracción visual manteniendo la estética"
    },
    {
      title: "📱 Responsive Design",
      description: "Adaptación automática según el dispositivo y condiciones de luz",
      benefit: "Experiencia optimizada en cualquier pantalla"
    }
  ];

  return (
    <div className="py-12 bg-soft-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="glass-primary text-primary border-primary/30 px-4 py-2 text-sm mb-4">
            <Eye className="w-4 h-4 mr-2" />
            CUIDADO OCULAR OPTIMIZADO
          </Badge>
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Paleta de Colores <span className="gradient-text-primary">Eye-Friendly</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diseñada para reducir la fatiga visual manteniendo la estética cyberpunk
          </p>
        </div>

        {/* Modo selector */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { mode: 'dark', icon: Moon, label: 'Modo Oscuro' },
            { mode: 'light', icon: Sun, label: 'Modo Claro' },
            { mode: 'auto', icon: Monitor, label: 'Automático' }
          ].map(({ mode, icon: Icon, label }) => (
            <Button
              key={mode}
              variant={currentMode === mode ? 'default' : 'outline'}
              onClick={() => setCurrentMode(mode as any)}
              className="hover-soft"
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Paleta de colores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {colorPalette.map((color, index) => (
            <Card key={index} className="glass hover-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{color.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">Optimizado</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Color actual */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border border-border/30"
                      style={{ backgroundColor: color.color }}
                    />
                    <span className="text-xs font-code">Nuevo: {color.color}</span>
                  </div>
                  
                  {/* Color anterior */}
                  <div className="flex items-center gap-2 opacity-60">
                    <div 
                      className="w-6 h-6 rounded border border-border/30"
                      style={{ backgroundColor: color.oldColor }}
                    />
                    <span className="text-xs font-code">Anterior: {color.oldColor}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {color.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mejoras implementadas */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {improvements.map((improvement, index) => (
            <Card key={index} className="glass hover-soft">
              <CardHeader>
                <CardTitle className="text-lg">{improvement.title}</CardTitle>
                <CardDescription>{improvement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-xs">
                  Beneficio: {improvement.benefit}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparación visual */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Antes - Colores Agresivos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                  <span className="text-sm">Cyan 100% saturación</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Verde neón puro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span className="text-sm">Púrpura intenso</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                ❌ Puede causar fatiga visual en sesiones largas
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Ahora - Colores Suavizados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'hsl(180 70% 45%)'}}></div>
                  <span className="text-sm">Cyan 70% saturación</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'hsl(120 60% 45%)'}}></div>
                  <span className="text-sm">Verde suavizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'hsl(260 40% 55%)'}}></div>
                  <span className="text-sm">Púrpura moderado</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                ✅ Diseñado para el cuidado ocular
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recomendaciones adicionales */}
        <div className="mt-12 p-6 glass rounded-xl">
          <h3 className="text-xl font-headline font-bold mb-4">💡 Recomendaciones Adicionales</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">📱 Dispositivos</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Usar modo oscuro en pantallas OLED</li>
                <li>• Ajustar brillo según ambiente</li>
                <li>• Mantener distancia de 50-70cm</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">⏰ Tiempo</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Pausas cada 20 minutos</li>
                <li>• Regla 20-20-20</li>
                <li>• Parpadear frecuentemente</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🌍 Ambiente</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Luz ambiental suave</li>
                <li>• Evitar reflejos directos</li>
                <li>• Temperatura de color 6500K</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 