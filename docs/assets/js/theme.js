'use strict';

/**
 * Копирование ссылки-приглашения в буфер обмена.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function initCopyButtons() {
	document.querySelectorAll('[data-copy]').forEach(function (button) {
		var label = button.querySelector('[data-copy-label]');
		var initialText = label ? label.textContent : '';
		var timer;

		button.addEventListener('click', function () {
			copyText(button.getAttribute('data-copy')).then(function () {
				button.classList.add('is-copied');
				if (label) label.textContent = 'Скопировано!';

				clearTimeout(timer);
				timer = setTimeout(function () {
					button.classList.remove('is-copied');
					if (label) label.textContent = initialText;
				}, 2000);
			}).catch(function () {
				if (label) label.textContent = 'Не удалось скопировать';
			});
		});
	});
}

function copyText(text) {
	if (navigator.clipboard && window.isSecureContext) {
		return navigator.clipboard.writeText(text).catch(function () {
			return copyTextFallback(text);
		});
	}

	return copyTextFallback(text);
}

// Запасной вариант для старых браузеров, http и случаев, когда браузер запретил доступ к буферу.
function copyTextFallback(text) {
	var input = document.createElement('textarea');
	input.value = text;
	input.setAttribute('readonly', '');
	input.style.position = 'fixed';
	input.style.opacity = '0';
	document.body.appendChild(input);
	input.select();
	var ok = document.execCommand('copy');
	document.body.removeChild(input);

	return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'));
}

/**
 * Живая статистика сервера из Discord (число участников и онлайн).
 * Если Discord недоступен — остаются значения из _data/stats.yml.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function initDiscordStats() {
	var root = document.querySelector('[data-discord-invite]');
	if (!root || !window.fetch) return;

	var invite = root.getAttribute('data-discord-invite');
	var url = 'https://discord.com/api/v10/invites/' + encodeURIComponent(invite) + '?with_counts=true';

	fetch(url)
		.then(function (response) {
			if (!response.ok) throw new Error(response.status);
			return response.json();
		})
		.then(function (data) {
			setStat(root, 'members', data.approximate_member_count);
			setStat(root, 'online', data.approximate_presence_count);
		})
		.catch(function () {});
}

function setStat(root, name, value) {
	var element = root.querySelector('[data-stat="' + name + '"]');
	if (element && typeof value === 'number') {
		element.textContent = value.toLocaleString('ru-RU');
	}
}

/**
 * Возраст сервера — пересчитывается в браузере, чтобы не зависеть от даты сборки сайта.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function initYears() {
	document.querySelectorAll('[data-years-since]').forEach(function (element) {
		var since = parseInt(element.getAttribute('data-years-since'), 10);
		if (since) element.textContent = new Date().getFullYear() - since;
	});
}

/**
 * Loading functions.
 * ---------------------------------------------------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', function () {
	initCopyButtons();
	initYears();
	initDiscordStats();
});
