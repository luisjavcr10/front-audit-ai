"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const Dashboard = () => {
  const data = {
    metricas_clave: {
      total_tarjetas: 500,
      tarjetas_vencidas: 15,
      tarjetas_sin_chip: 20,
      tarjetas_con_pin_antiguo: 45,
      tarjetas_con_limites_bajos: 10,
      clientes_con_multiples_tarjetas: 30,
    },
    indicadores_riesgo: [
      { tipo: "Tarjetas vencidas", cantidad: 15 },
      { tipo: "PIN no actualizado", cantidad: 45 },
      { tipo: "Límites de crédito inusuales", cantidad: 10 },
      { tipo: "Tarjetas sin chip", cantidad: 20 },
      { tipo: "Clientes con múltiples tarjetas", cantidad: 30 },
    ],
    observaciones_resumidas: [
      "Se detectaron tarjetas vencidas que deben ser desactivadas o reemplazadas.",
      "Se identificaron tarjetas con PIN no actualizado en más de 10 años.",
      "Algunas tarjetas prepago tienen límites de crédito inusualmente bajos.",
      "Existen tarjetas sin chip que deben ser actualizadas.",
      "Algunos clientes tienen múltiples tarjetas emitidas sin justificación aparente."
    ],
  };

  return (
    <div className="p-8 space-y-10 bg-black text-white">
      {/* Métricas clave */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(data.metricas_clave).map(([key, value]) => (
          <div key={key} className="p-5 bg-[#3E432E] shadow-lg rounded-lg text-center border border-[#616F39] hover:border-[#A7D129] transition-all duration-300">
            <p className="text-gray-300 capitalize mb-2">{key.replace(/_/g, " ")}</p>
            <p className="text-3xl font-bold text-[#A7D129]">{value}</p>
          </div>
        ))}
      </div>

      {/* Gráfico de indicadores de riesgo */}
      <div className="bg-[#3E432E] p-6 rounded-xl shadow-lg border border-[#616F39]">
        <h2 className="text-xl font-semibold mb-6 text-[#A7D129]">Indicadores de Riesgo</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data.indicadores_riesgo}>
            <XAxis dataKey="tipo" tick={{ fontSize: 12, fill: '#e0e0e0' }} />
            <YAxis tick={{ fill: '#e0e0e0' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #616F39' }} labelStyle={{ color: '#A7D129' }} />
            <Bar dataKey="cantidad" fill="#A7D129" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Observaciones resumidas */}
      <div className="bg-[#3E432E] p-6 rounded-xl shadow-lg border border-[#616F39]">
        <h2 className="text-xl font-semibold mb-6 text-[#A7D129]">Observaciones Resumidas</h2>
        <ul className="list-disc pl-6 space-y-3">
          {data.observaciones_resumidas.map((obs, index) => (
            <li key={index} className="text-gray-200 leading-relaxed">{obs}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

