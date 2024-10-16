export interface ApiInfo {
	version: string;
	modelConfigs: ModelConfig[];
}

export interface ModelConfig {
	modelProvider: ModelProvider;
	supportedModels: string[];
}

export interface ModelProvider {
	id: string;
	friendlyName: string;
}
