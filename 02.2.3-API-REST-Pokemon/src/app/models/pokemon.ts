export interface NamedResource { name: string; url: string; }
export interface ResourceList { count: number; next: string | null; previous: string | null; results: NamedResource[]; }
export interface PokemonType { id: number; name: string; pokemon: { slot: number; pokemon: NamedResource }[]; }
export interface Pokemon { id: number; name: string; height: number; weight: number; base_experience: number | null; sprites: { front_default: string | null }; types: { slot: number; type: NamedResource }[]; abilities: { is_hidden: boolean; ability: NamedResource }[]; stats: { base_stat: number; stat: NamedResource }[]; }
