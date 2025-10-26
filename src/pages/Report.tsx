import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Share2, TrendingUp, Info } from "lucide-react";
import gteamLogo from "@/assets/gteam-logo.png";

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

    const handleDownload = () => {
        window.print();
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
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between animate-slide-up">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar
                    </Button>

                    <img src={gteamLogo} alt="GTEAM Logo" className="h-12 w-auto" />

                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleShare}>
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleDownload}>
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2 animate-slide-up">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                        Relatório Nutricional Completo
                    </h1>
                    <p className="text-muted-foreground">
                        Análise detalhada da sua refeição • {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>

                {/* Image Card */}
                {imagePreview && (
                    <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-fade-in">
                        <CardContent className="p-6">
                            <img
                                src={imagePreview}
                                alt="Refeição analisada"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </CardContent>
                    </Card>
                )}

                {/* No Data Warning */}
                {!output.ingredientes && !output.calorias_totais_kcal && !output.detalhes && (
                    <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-slide-up border-l-4 border-l-yellow-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-yellow-500" />
                                Aguardando Dados
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground leading-relaxed">
                                A análise foi enviada mas ainda não recebemos os dados nutricionais.
                                Verifique o card de debug abaixo para ver os dados brutos recebidos da API.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Ingredients Detected */}
                {output.ingredientes && output.ingredientes.length > 0 && (
                    <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 animate-slide-up">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🍽️</span>
                                Ingredientes Identificados
                            </CardTitle>
                            <CardDescription>
                                {output.ingredientes!.length} item(ns) detectado(s) pela IA
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {output.ingredientes!.map((ingrediente, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className="text-xs">
                                                    {index + 1}
                                                </Badge>
                                                <span className="font-medium text-lg">{ingrediente.name}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground font-medium">
                                                {ingrediente.quantity}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2 text-xs">
                                            <div className="text-center p-2 rounded bg-background/50">
                                                <p className="text-muted-foreground">Calorias</p>
                                                <p className="font-semibold text-primary">{ingrediente.calories}</p>
                                            </div>
                                            <div className="text-center p-2 rounded bg-background/50">
                                                <p className="text-muted-foreground">Proteína</p>
                                                <p className="font-semibold">{ingrediente.protein}</p>
                                            </div>
                                            <div className="text-center p-2 rounded bg-background/50">
                                                <p className="text-muted-foreground">Carbs</p>
                                                <p className="font-semibold">{ingrediente.carbs}</p>
                                            </div>
                                            <div className="text-center p-2 rounded bg-background/50">
                                                <p className="text-muted-foreground">Gordura</p>
                                                <p className="font-semibold">{ingrediente.fat}</p>
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
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Resumo Nutricional
                            </CardTitle>
                            <CardDescription>
                                Valores totais estimados da refeição
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Energy Highlight */}
                            <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                                        Energia Total
                                    </p>
                                    <p className="text-5xl font-bold text-primary">
                                        {output.calorias_totais_kcal}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Macros Breakdown */}
                            {totalMacros > 0 && (
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Distribuição de Macronutrientes</h3>

                                    <div className="space-y-4">
                                        {/* Proteins */}
                                        {output.macry_nutrientes?.proteinas_g && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">Proteínas</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {output.macry_nutrientes.proteinas_g} ({proteinPercentage.toFixed(1)}%)
                                                    </span>
                                                </div>
                                                <Progress value={proteinPercentage} className="h-2" />
                                            </div>
                                        )}

                                        {/* Carbs */}
                                        {output.macry_nutrientes?.carboidratos_g && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">Carboidratos</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {output.macry_nutrientes.carboidratos_g} ({carbsPercentage.toFixed(1)}%)
                                                    </span>
                                                </div>
                                                <Progress value={carbsPercentage} className="h-2" />
                                            </div>
                                        )}

                                        {/* Fats */}
                                        {output.macry_nutrientes?.gorduras_totais_g && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">Gorduras Totais</span>
                                                    <span className="text-sm text-muted-foreground">
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
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Informações Adicionais</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {output.detalhes.fibras_g && (
                                            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Fibras</p>
                                                <p className="text-2xl font-bold text-primary">{output.detalhes.fibras_g}</p>
                                            </div>
                                        )}

                                        {output.detalhes.acucares_g && (
                                            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Açúcares</p>
                                                <p className="text-2xl font-bold text-primary">{output.detalhes.acucares_g}</p>
                                            </div>
                                        )}

                                        {output.detalhes.gorduras_saturadas_g && (
                                            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Gorduras Saturadas</p>
                                                <p className="text-2xl font-bold text-primary">{output.detalhes.gorduras_saturadas_g}</p>
                                            </div>
                                        )}

                                        {output.detalhes.sodio_mg && (
                                            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Sódio</p>
                                                <p className="text-2xl font-bold text-primary">{output.detalhes.sodio_mg}</p>
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
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-yellow-500" />
                                Aviso de Precisão
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground leading-relaxed">{output.aviso_precisao}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Footer */}
                <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95">
                    <CardContent className="p-6">
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Este relatório foi gerado automaticamente por inteligência artificial
                            </p>
                            <p className="text-xs text-muted-foreground">
                                GTEAM Labs • Tecnologia de análise alimentar por IA
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Button */}
                <div className="flex justify-center pb-8">
                    <Button
                        onClick={() => navigate("/")}
                        size="lg"
                        className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all"
                    >
                        Nova Análise
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Report;
