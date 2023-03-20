export class IngresosManuales {
    Seccion: any;
    Tipo: any;
    TagIngresos: TagIngresos[];
}

export class TagIngresos {
    Tag: any;
    fechaValor: fechaValor[];
}

export class fechaValor{
    Fecha:any;
    Valor:any;
}

export class Indicador{
    Nombre:any;
    Calculo:any;
    TipoCalculo:any;
    Tag:any;
    Seccion:any;
    CantidadDecimales:any;
    Fuente:any;
    Unidad:any;
    Min:any;
    Max:any;
    enBSC:any;
    enCC:any;
    enRD:any;
    Habilitado:any;
    Compuestos:any[]; //los snaps
}

export class ResumenDiaVM{
    FK_indicador: string;
    Observacion: String;
    Responsable: String;
    FechaInicio: any;
    FechaReg: any;
    id: any;
    FechaFin: any;

}



export class resumenVista{
    FK_indicador: string;
    Observacion: String;
    Responsable: String;
    FechaInicio: any;
    FechaFin:any;
    FechaReg: any;
    id: any;
    Nombre: any;
    Unidad: any;
    Min: any;
    Max: any;
    Promedio: any;
    Valor: any;


}
export class datos{
    eventoStart: any;
    eventoStop: any;
    minutosEvento: any;
    horasEvento: any;
    target: any;
    velocidadReal: any;
    velocidadMin: any;
    velocidadHs: any;
    totInicioEvento: any;
    totFinalEvento:any;
    totKgEvento: any;
    totMin: any;
    totHs:any;
    causa: string;
    Observacion: string;
}




