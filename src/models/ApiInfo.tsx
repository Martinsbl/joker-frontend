export interface ApiInfo {
	version: string;
	modelConfigs: ModelConfig[];
}

export interface ModelConfig {
	modelProvider: string;
	supportedModels: string[];
}
