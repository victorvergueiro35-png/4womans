import React, { useState } from 'react';
import { Search, ArrowRightLeft, Sparkles } from 'lucide-react';

export const SubstitutionsFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const substitutions = [
    { from: 'Pão francês / pão branco', to: 'Pão 100% centeio, tapioca com chia ou crepe de aveia', category: 'Carboidratos' },
    { from: 'Arroz branco tradicional', to: 'Quinoa em grãos, arroz negro ou arroz de couve-flor', category: 'Carboidratos' },
    { from: 'Feijão gordo / embutidos', to: 'Lentilha temperada no alho, grão-de-bico com azeite', category: 'Leguminosas' },
    { from: 'Carne vermelha gordurosa', to: 'Peixe branco fresco, peito de frango caipira ou ovos', category: 'Proteínas' },
    { from: 'Iogurte adoçado industrial', to: 'Iogurte natural integral, kefir puro ou de coco', category: 'Laticínios' },
    { from: 'Óleo de soja / milho / margarina', to: 'Azeite extravirgem (acidez ≤ 0.5%) ou ghee', category: 'Gorduras' },
    { from: 'Doces refinados / bolos', to: 'Frutas vermelhas com cacau 100%, tâmaras com nozes', category: 'Sobremesas' },
    { from: 'Refrigerante / sucos de caixa', to: 'Água com gás + limão espremido ou chá de hibisco gelado', category: 'Bebidas' },
    { from: 'Café com açúcar', to: 'Café expresso puro com pitada de canela em pó', category: 'Bebidas' },
    { from: 'Queijo amarelo gorduroso', to: 'Queijo minas frescal, ricota fresca ou queijo de cabra', category: 'Laticínios' }
  ];

  const filtered = substitutions.filter(
    (item) =>
      item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full my-4 bg-[#2C2C2C] p-4 border border-[#3D3D3D] shadow-md text-left"
    >
      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#F9F9F9]/50" />
        <input
          type="text"
          placeholder="Buscar substituição (ex: pão, arroz, doce)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-[#1E1E1E] border border-[#383838] text-xs text-[#F9F9F9] placeholder-[#F9F9F9]/40 focus:outline-none focus:border-[#D4AF37] font-serif italic"
        />
      </div>

      {/* List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#1E1E1E] border border-[#383838] flex flex-col gap-1 text-xs"
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C29B91]">
              <span>{item.category}</span>
              <span className="flex items-center gap-1 text-[#D4AF37]">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Troca Inteligente
              </span>
            </div>
            <div className="flex items-start gap-2 pt-0.5">
              <span className="text-[#F9F9F9]/45 line-through font-medium flex-1">
                {item.from}
              </span>
              <ArrowRightLeft className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
              <span className="text-[#F9F9F9] font-bold flex-1">
                {item.to}
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-xs text-center text-[#F9F9F9]/50 py-3 italic">
            Nenhum ingrediente encontrado com esse termo.
          </p>
        )}
      </div>
    </div>
  );
};
