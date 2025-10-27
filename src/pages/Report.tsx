import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Share2, TrendingUp, Info } from "lucide-react";
import gteamLogo from "@/assets/gteam-logo.png";
import html2canvas from "html2canvas";
import { toast } from "sonner";

interface Ingrediente {
    name: string;
    quantity: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
}

interface MacroNutrientes {
    proteinas_g?: string;
    carboidratos_g?: string;
    gorduras_totais_g?: string;
}

interface Detalhes {
    fibras_g?: string;
    acucares_g?: string;
    sodio_mg?: string;
    gorduras_saturadas_g?: string;
}

interface OutputData {
    descricao?: string;
    calorias_totais_kcal?: string;
    macry_nutrientes?: MacroNutrientes;
    detalhes?: Detalhes;
    ingredientes?: Ingrediente[];
    aviso_precisao?: string;
}

interface NutritionalData {
    output?: OutputData;
}

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const downloadRef = useRef<HTMLDivElement>(null);
    const { data, imagePreview } = location.state as { data: NutritionalData; imagePreview: string } || {};

    // Debug: log the data received
    console.log("Report data received:", data);

    if (!data || !data.output) {
        navigate("/");
        return null;
    }

    const output = data.output;

    // Parse numeric values from strings
    const parseValue = (value?: string): number => {
        if (!value) return 0;
        return parseFloat(value.replace(/[^\d.]/g, '')) || 0;
    };

    const proteinas = parseValue(output.macry_nutrientes?.proteinas_g);
    const carboidratos = parseValue(output.macry_nutrientes?.carboidratos_g);
    const gorduras = parseValue(output.macry_nutrientes?.gorduras_totais_g);

    const totalMacros = proteinas + carboidratos + gorduras;
    const proteinPercentage = totalMacros > 0 ? (proteinas / totalMacros) * 100 : 0;
    const carbsPercentage = totalMacros > 0 ? (carboidratos / totalMacros) * 100 : 0;
    const fatsPercentage = totalMacros > 0 ? (gorduras / totalMacros) * 100 : 0;

    const handleDownloadJPG = async () => {
        if (!downloadRef.current) return;
        
        try {
            toast.loading("Gerando imagem do relatório...");
            
            // Capture only the nutritional data section
            const canvas = await html2canvas(downloadRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#0f1419',
                logging: false,
            });

            // Convert to JPG
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `relatorio-nutricional-${new Date().getTime()}.jpg`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    toast.success("Relatório baixado com sucesso!");
                }
            }, 'image/jpeg', 0.95);
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error("Erro ao baixar o relatório");
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'GTEAM Scan - Relatório Nutricional',
                    text: 'Confira minha análise nutricional!',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 sm:p-6">
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between animate-slide-up gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="gap-1.5 sm:gap-2 h-10 sm:h-11 px-2 sm:px-4 touch-manipulation active:scale-95"
                        size="sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden xs:inline">Voltar</span>
                    </Button>

                    <img src={gteamLogo} alt="GTEAM Logo" className="h-8 sm:h-10 md:h-12 w-auto" />

                    <div className="flex gap-1.5 sm:gap-2">
                        <Button variant="outline" size="icon" onClick={handleShare} className="h-10 w-10 sm:h-11 sm:w-11 touch-manipulation active:scale-95">
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleDownloadJPG} className="h-10 w-10 sm:h-11 sm:w-11 touch-manipulation active:scale-95">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-1.5 sm:space-y-2 animate-slide-up px-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight">
                        Relatório Nutricional
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Análise detalhada • {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>

                {/* Image Card - NOT included in download */}
                {imagePreview && (
                    <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-fade-in">
                        <CardContent className="p-3 sm:p-4 md:p-6">
                            <img
                                src={imagePreview}
                                alt="Refeição analisada"
                                className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-lg"
                            />
                        </CardContent>
                    </Card>
                )}

                {/* Downloadable Content - Only this section will be captured */}
                <div ref={downloadRef} className="space-y-4 sm:space-y-5">
                    {/* No Data Warning */}
                    {!output.ingredientes && !output.calorias_totais_kcal && !output.detalhes && (
                        <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-slide-up border-l-4 border-l-yellow-500">
                            <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Info className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
                                    Aguardando Dados
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-5">
                                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                                    A análise foi enviada mas ainda não recebemos os dados nutricionais.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Ingredients Detected */}
                    {output.ingredientes && output.ingredientes.length > 0 && (
                        <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-slide-up">
                            <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <span className="text-xl sm:text-2xl">🍽️</span>
                                    Ingredientes Identificados
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    {output.ingredientes!.length} item(ns) detectado(s) pela IA
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-5">
                                <div className="grid gap-2.5 sm:gap-3">
                                    {output.ingredientes!.map((ingrediente, index) => (
                                        <div
                                            key={index}
                                            className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border active:bg-secondary/50 transition-colors"
                                        >
                                            <div className="flex items-start sm:items-center justify-between mb-2.5 sm:mb-3 gap-2">
                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                    <Badge variant="outline" className="text-xs flex-shrink-0">
                                                        {index + 1}
                                                    </Badge>
                                                    <span className="font-medium text-base sm:text-lg truncate">{ingrediente.name}</span>
                                                </div>
                                                <span className="text-xs sm:text-sm text-muted-foreground font-medium flex-shrink-0">
                                                    {ingrediente.quantity}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                                <div className="text-center p-2 rounded bg-background/50">
                                                    <p className="text-muted-foreground text-[10px] sm:text-xs mb-0.5">Calorias</p>
                                                    <p className="font-semibold text-primary text-xs sm:text-sm">{ingrediente.calories}</p>
                                                </div>
                                                <div className="text-center p-2 rounded bg-background/50">
                                                    <p className="text-muted-foreground text-[10px] sm:text-xs mb-0.5">Proteína</p>
                                                    <p className="font-semibold text-xs sm:text-sm">{ingrediente.protein}</p>
                                                </div>
                                                <div className="text-center p-2 rounded bg-background/50">
                                                    <p className="text-muted-foreground text-[10px] sm:text-xs mb-0.5">Carbs</p>
                                                    <p className="font-semibold text-xs sm:text-sm">{ingrediente.carbs}</p>
                                                </div>
                                                <div className="text-center p-2 rounded bg-background/50">
                                                    <p className="text-muted-foreground text-[10px] sm:text-xs mb-0.5">Gordura</p>
                                                    <p className="font-semibold text-xs sm:text-sm">{ingrediente.fat}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Nutritional Summary */}
                    {output.calorias_totais_kcal && (
                        <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-slide-up">
                            <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                                    Resumo Nutricional
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    Valores totais estimados da refeição
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 sm:space-y-5 px-4 pb-4 sm:px-6 sm:pb-5">
                                {/* Energy Highlight */}
                                <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20">
                                    <div className="text-center">
                                        <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide mb-1.5 sm:mb-2">
                                            Energia Total
                                        </p>
                                        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                                            {output.calorias_totais_kcal}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Macros Breakdown */}
                                {totalMacros > 0 && (
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="font-semibold text-base sm:text-lg">Distribuição de Macronutrientes</h3>

                                        <div className="space-y-3 sm:space-y-4">
                                            {/* Proteins */}
                                            {output.macry_nutrientes?.proteinas_g && (
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <span className="text-xs sm:text-sm font-medium">Proteínas</span>
                                                        <span className="text-xs sm:text-sm text-muted-foreground">
                                                            {output.macry_nutrientes.proteinas_g} ({proteinPercentage.toFixed(1)}%)
                                                        </span>
                                                    </div>
                                                    <Progress value={proteinPercentage} className="h-2" />
                                                </div>
                                            )}

                                            {/* Carbs */}
                                            {output.macry_nutrientes?.carboidratos_g && (
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <span className="text-xs sm:text-sm font-medium">Carboidratos</span>
                                                        <span className="text-xs sm:text-sm text-muted-foreground">
                                                            {output.macry_nutrientes.carboidratos_g} ({carbsPercentage.toFixed(1)}%)
                                                        </span>
                                                    </div>
                                                    <Progress value={carbsPercentage} className="h-2" />
                                                </div>
                                            )}

                                            {/* Fats */}
                                            {output.macry_nutrientes?.gorduras_totais_g && (
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <span className="text-xs sm:text-sm font-medium">Gorduras Totais</span>
                                                        <span className="text-xs sm:text-sm text-muted-foreground">
                                                            {output.macry_nutrientes.gorduras_totais_g} ({fatsPercentage.toFixed(1)}%)
                                                        </span>
                                                    </div>
                                                    <Progress value={fatsPercentage} className="h-2" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Separator />

                                {/* Additional Nutritional Info */}
                                {output.detalhes && (
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="font-semibold text-base sm:text-lg">Informações Adicionais</h3>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                            {output.detalhes.fibras_g && (
                                                <div className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border">
                                                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Fibras</p>
                                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{output.detalhes.fibras_g}</p>
                                                </div>
                                            )}

                                            {output.detalhes.acucares_g && (
                                                <div className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border">
                                                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Açúcares</p>
                                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{output.detalhes.acucares_g}</p>
                                                </div>
                                            )}

                                            {output.detalhes.gorduras_saturadas_g && (
                                                <div className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border">
                                                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Gorduras Sat.</p>
                                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{output.detalhes.gorduras_saturadas_g}</p>
                                                </div>
                                            )}

                                            {output.detalhes.sodio_mg && (
                                                <div className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border">
                                                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Sódio</p>
                                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{output.detalhes.sodio_mg}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Precision Warning */}
                    {output.aviso_precisao && (
                        <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-slide-up border-l-4 border-l-yellow-500">
                            <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Info className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
                                    Aviso de Precisão
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-5">
                                <p className="text-sm sm:text-base text-foreground leading-relaxed">{output.aviso_precisao}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Footer */}
                    <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95">
                        <CardContent className="p-4 sm:p-5 md:p-6">
                            <div className="text-center space-y-1.5 sm:space-y-2">
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Este relatório foi gerado automaticamente por inteligência artificial
                                </p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground">
                                    GTEAM Labs • Tecnologia de análise alimentar por IA
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pb-6 sm:pb-8">
                    <Button
                        onClick={() => navigate("/")}
                        size="lg"
                        className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base touch-manipulation active:scale-95"
                    >
                        Nova Análise
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Report;
