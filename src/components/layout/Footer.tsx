'use client';

export function Footer() {
	return (
		<footer className='border-t bg-muted/30 mt-auto'>
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl'>
					<div className='mb-4'>
						<span className='text-xl font-bold'>Github Translator</span>
					</div>
						<p className='text-sm text-muted-foreground mb-4 max-w-md'>
							一站式 GitHub 仓库多语言翻译 SaaS
							平台，帮助开源项目作者将文档自动翻译成多种语言，扩大国际影响力。
						</p>
				</div>

				{/* Copyright */}
				<div className='border-t mt-8 pt-6 text-center'>
					<p className='text-xs text-muted-foreground'>
						© {new Date().getFullYear()} Github Translator. Powered by Next.js +
						OpenRouter + GitHub App
					</p>
				</div>
			</div>
		</footer>
	);
}
