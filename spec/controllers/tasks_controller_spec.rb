require 'rails_helper'

RSpec.describe TasksController, type: :controller do

  describe 'GET #show' do
    it "assigns @task" do
      task = Task.create(
        content: "web",
        status: :todo
      )
      get :show, params: { id: task }
      expect(assigns(:task)).to eq task
    end
  end

  describe 'GET #index' do
    it "assigns @tasks" do
      task1 = Task.create(
        content: "web",
        status: :todo
      )
      task2 = Task.create(
        content: "eat",
        status: :doing
      )
      get :index
      expect(assigns(:tasks)).to match_array([task1, task2])
    end
  end

  describe 'GET #new' do
    it "assigns a new Task to @task" do
      get :new
      expect(assigns(:task)).to be_a_new(Task)
    end
  end

  describe 'GET #edit' do
    it "assigns @task" do
      task = Task.create(
        content: "web",
        status: :todo
      )
      get :edit, params: { id: task }
      expect(assigns(:task)).to eq task
    end
  end

  describe 'POST #create' do

    context 'valid attributes' do
      it "saves the new task in the database" do
        expect{
          post :create, params: { task: { content: "web", status: :todo } }
        }.to change(Task, :count).by(1)
      end

      it "redirects to tasks#show" do
        post :create, params: { task: { content: "web", status: :todo } }
        expect(response).to redirect_to task_path(assigns[:task])
      end
    end

    context 'with invalid attributes' do
      it "does not save the new task in the database" do
        expect{
          post :create, params: { task: { content: nil, status: :todo } }
        }.not_to change(Task, :count)
      end

      it "re-render the :new template" do
        post :create, params: { task: { content: nil, status: :todo } }
        expect(response).to render_template :new
      end
    end

  end

  describe 'POST #update' do
    before :each do
      @task = Task.create(
        content: "awake",
        status: :todo
      )
    end

    context 'valid attributes' do
      it "locates the requested @task" do
        patch :update, params: { id: @task, task: { content: "awake", status: :todo } }
        expect(assigns(:task)).to eq(@task)
      end

      it "changes @task's attributes" do
        patch :update, params: { id: @task, task: { content: "sleep", status: :todo } }
        @task.reload
        expect(@task.content).to eq('sleep')
        expect(@task.status).to eq('todo')
      end

      it "redirect to the updated contact" do
        patch :update, params: { id: @task, task: { content: "sleep", status: :todo } }
        expect(response).to redirect_to @task
      end
    end

    context 'with invalid attributes' do
      it "does not change the task's attributes" do
        patch :update, params: { id: @task, task: { content: nil, status: :done } }
        @task.reload
        expect(@task.content).to eq('awake')
        expect(@task.status).not_to eq('done')
      end

      it "does not change the task's attributes" do
        patch :update, params: { id: @task, task: { content: nil, status: :done } }
        @task.reload
        expect(@task.content).to eq('awake')
        expect(@task.status).not_to eq('done')
      end
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      @task = Task.create(
        content: "running",
        status: :todo
      )
    end

    it "deletes the task" do
      expect{
        delete :destroy, params: { id: @task }
      }.to change(Task, :count).by(-1)
    end
  end
end
