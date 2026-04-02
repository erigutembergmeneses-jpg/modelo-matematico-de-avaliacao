// script.js - Motor de cálculo do modelo Vᵢ = α·R_edu + β·E + γ·G

function calcular() {
    // Obter valores dos inputs
    let custoEdu = parseFloat(document.getElementById('custoEdu').value);
    let salarioEduc = parseFloat(document.getElementById('salarioEduc').value);
    let salarioBase = parseFloat(document.getElementById('salarioBase').value);
    let empregabilidade = parseFloat(document.getElementById('empregabilidade').value);
    let valorG = parseFloat(document.getElementById('valorG').value);
    let alpha = parseFloat(document.getElementById('alpha').value);
    let beta = parseFloat(document.getElementById('beta').value);
    let gamma = parseFloat(document.getElementById('gamma').value);
    let vmin = parseFloat(document.getElementById('vmin').value);
    
    // Validações básicas
    if (isNaN(custoEdu) || custoEdu <= 0) custoEdu = 0.0001;
    if (isNaN(salarioEduc)) salarioEduc = 0;
    if (isNaN(salarioBase)) salarioBase = 0;
    if (isNaN(empregabilidade)) empregabilidade = 0;
    if (isNaN(valorG)) valorG = 0;
    if (isNaN(vmin)) vmin = 15;
    
    // Normalizar pesos (garantir que α+β+γ = 1)
    let somaPesos = alpha + beta + gamma;
    if (somaPesos !== 0 && somaPesos !== 1) {
        alpha = alpha / somaPesos;
        beta = beta / somaPesos;
        gamma = gamma / somaPesos;
    } else if (somaPesos === 0) {
        alpha = 0.2;
        beta = 0.3;
        gamma = 0.5;
    }
    
    // Atualizar campos com pesos normalizados (feedback visual)
    document.getElementById('alpha').value = alpha.toFixed(4);
    document.getElementById('beta').value = beta.toFixed(4);
    document.getElementById('gamma').value = gamma.toFixed(4);
    
    // Cálculo de R_edu (Retorno sobre investimento educacional)
    let diferencaSalarial = Math.max(0, salarioEduc - salarioBase);
    let rEdu = diferencaSalarial / custoEdu;
    
    // Termos da equação
    let termAlpha = alpha * rEdu;
    let termBeta = beta * empregabilidade;
    let termGamma = gamma * valorG;
    let vi = termAlpha + termBeta + termGamma;
    
    // Atualizar interface com resultados
    document.getElementById('viDisplay').innerHTML = vi.toFixed(4);
    document.getElementById('rEdu').innerHTML = rEdu.toFixed(5);
    document.getElementById('eVal').innerHTML = empregabilidade.toFixed(3);
    document.getElementById('gVal').innerHTML = valorG.toFixed(2);
    document.getElementById('termA').innerHTML = termAlpha.toFixed(5);
    document.getElementById('termB').innerHTML = termBeta.toFixed(5);
    document.getElementById('termC').innerHTML = termGamma.toFixed(5);
    
    // Determinar status de descartabilidade
    const statusDiv = document.getElementById('statusBadge');
    const alertDiv = document.getElementById('alertMsg');
    
    if (vi < vmin) {
        statusDiv.innerHTML = '<div class="badge disposable">⚠️ DESCARTAVEL — Abaixo do limiar V_min</div>';
        alertDiv.innerHTML = '<div style="background:#fee2e2; padding:0.8rem; border-radius:0.8rem; margin-top:0.5rem; border-left:3px solid #b91c1c;"><strong>🔻 ALERTA:</strong> O algoritmo classifica este indivíduo como SUBSTITUÍVEL. A narrativa "qualquer um pode ser substituído" é ativada. Demissão ou desativação iminente.</div>';
    } else {
        statusDiv.innerHTML = '<div class="badge viable">✅ ACIMA DO LIMIAR — Valor mensurável aceitável</div>';
        alertDiv.innerHTML = '<div style="background:#dcfce7; padding:0.8rem; border-radius:0.8rem; margin-top:0.5rem; border-left:3px solid #166534;"><strong>✔️ ESTÁVEL:</strong> Indivíduo mantém valor acima do limiar. No entanto, qualquer queda nas métricas ou aumento do V_min pode torná-lo descartável.</div>';
    }
}

// Sincronizar exibição do valor da empregabilidade (range)
function syncEmpregabilidade() {
    const range = document.getElementById('empregabilidade');
    const span = document.getElementById('empValue');
    span.innerText = parseFloat(range.value).toFixed(2);
    calcular();
}

// Configurar eventos
document.getElementById('calcular').addEventListener('click', calcular);
document.getElementById('empregabilidade').addEventListener('input', syncEmpregabilidade);

// Adicionar listeners automáticos para atualização em tempo real
const camposDinamicos = ['custoEdu', 'salarioEduc', 'salarioBase', 'valorG', 'alpha', 'beta', 'gamma', 'vmin'];
camposDinamicos.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', calcular);
        el.addEventListener('change', calcular);
    }
});

// Inicializar ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    syncEmpregabilidade();
    calcular();
});
