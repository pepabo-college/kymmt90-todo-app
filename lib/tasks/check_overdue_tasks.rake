require 'slack'

namespace :todo_tasks do
  desc 'Check overdue tasks'
  task check_overdues: :environment do
    Slack.configure do |config|
      config.token = ENV['SLACK_TOKEN']
    end

    unless (my_info = find_my_info)
      puts 'slack user not found'
      exit
    end

    Slack.chat_postMessage(channel: my_info['id'], text: "期限すぎてますよ〜 at #{now}\n#{overdue_tasks}")
  end

  def find_my_info
    Slack.users_list['members'].find do |user|
      user['name'] == ENV['SLACK_USER_NAME']
    end
  end

  def overdue_tasks
    overdues = Task.unfinished.where.not(deadline: nil)
                              .where('deadline <= ?', Time.now)
    overdues.map { |o| "#{o.content} #{o.deadline.strftime('%F %H:%M')}" }.join("\n")
  end

  def now
    Time.now.strftime('%F %H:%M')
  end
end
