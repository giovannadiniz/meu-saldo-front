import { Component } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-inicio',
  imports: [
    DecimalPipe, NgxChartsModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  despesasCasa = [
    { name: 'Aluguel', value: 1500 },
    { name: 'Água', value: 80 },
    { name: 'Luz', value: 150 },
    { name: 'Internet', value: 100 },
    { name: 'Gás', value: 70 }
  ];

  // Dados para o gráfico de Lazer
  despesasLazer = [
    { name: 'Restaurantes', value: 400 },
    { name: 'Cinema', value: 120 },
    { name: 'Viagens', value: 800 },
    { name: 'Streaming', value: 50 }
  ];

  // Dados para o gráfico de Transporte
  despesasTransporte = [
    { name: 'Gasolina', value: 350 },
    { name: 'Uber', value: 200 },
    { name: 'Manutenção', value: 150 }
  ];

  // Dados para gráfico de linha - evolução mensal
  evolucaoMensal = [
    {
      name: 'Despesas',
      series: [
        { name: 'Jan', value: 2800 },
        { name: 'Fev', value: 3200 },
        { name: 'Mar', value: 2900 },
        { name: 'Abr', value: 3400 },
        { name: 'Mai', value: 3100 },
        { name: 'Jun', value: 2950 }
      ]
    }
  ];

  // Configurações dos gráficos - IMPORTANTE: Na v22 o colorScheme é uma string
  view: [number, number] = [400, 300];
  colorScheme: string = 'vivid'; // Opções: 'vivid', 'natural', 'cool', 'fire', 'solar', 'air', 'aqua', 'flame', 'ocean', 'forest', 'horizon', 'neons', 'picnic', 'night', 'nightLights'

  // Opções
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoria';
  showYAxisLabel = true;
  yAxisLabel = 'Valor (R$)';

  // Cálculos de totais
  get totalCasa(): number {
    return this.despesasCasa.reduce((sum, item) => sum + item.value, 0);
  }

  get totalLazer(): number {
    return this.despesasLazer.reduce((sum, item) => sum + item.value, 0);
  }

  get totalTransporte(): number {
    return this.despesasTransporte.reduce((sum, item) => sum + item.value, 0);
  }

  get totalGeral(): number {
    return this.totalCasa + this.totalLazer + this.totalTransporte;
  }

  onSelect(event: any) {
    console.log('Item selecionado:', event);
  }
}
